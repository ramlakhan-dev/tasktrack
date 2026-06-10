import ApiError from "../utils/apiError.js";
import crypto from "crypto";
import sendEmail, { sendResetPassMail } from  "../utils/sendEmail.js";
import User from "../models/user.model.js";
import VerificationToken from "../models/verificationtoken.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";
import RefreshToken from "../models/refreshtoken.model.js";
import ResetPasswordToken from "../models/resetpasstoken.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (userData) => {

    const { name, email, password } = userData;

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const token = crypto.randomBytes(32).toString("hex");
    
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await VerificationToken.create({
        userId: user._id,
        token,
        expiresAt: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        )
    });

    await sendEmail(user.email, verificationLink);

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};

export const verifyEmail = async (token) => {

    const verificationRecord = await VerificationToken.findOne({ token });

    if (!verificationRecord) {
        throw new ApiError(400, "Invalid verification token");
    }

    if (verificationRecord.expiresAt < new Date()) {
        await VerificationToken.deleteOne({
            _id: verificationRecord._id
        });

        throw new ApiError(400, "Verification token expired");
    }

    const user = await User.findById(verificationRecord.userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
        throw new ApiError(400, "User already verified");
    }

    user.isVerified = true;
    await user.save();

    await VerificationToken.deleteOne({
        _id: verificationRecord._id
    });

    return true;
};


export const loginUser = async (userData) => {

    const { email, password } = userData;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    if (!user.isVerified) {
        throw new ApiError(403, "Please verify your email before logging in");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });

    const userObj = user.toObject();
    delete userObj.password;
    return {
        user: userObj,
        accessToken,
        refreshToken
    };
};


export const forgotPasswordUser = async (email) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    
    await ResetPasswordToken.create({
        userId: user._id,
        token: hashedToken,
        expiresAt: new Date(
            Date.now() + 15 * 60 * 1000
        )
    });

    const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`

    await sendResetPassMail(user.email, resetPasswordLink);
};


export const resetPasswordUser = async (token, password) => {

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    
    const resetPasswordRecord = await ResetPasswordToken.findOne({
        token: hashedToken
    });

    if (!resetPasswordRecord) {
        throw new ApiError(400, "Invalid reset password token");
    }

    if (resetPasswordRecord.expiresAt < new Date()) {
        await ResetPasswordToken.deleteOne({
            _id: resetPasswordRecord._id
        });
        throw new ApiError(400, "Reset password token expired");
    }

    const user = await User.findById(resetPasswordRecord.userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.password = password;

    await user.save();
    await ResetPasswordToken.deleteOne({
            _id: resetPasswordRecord._id
    });

    return true;
};


export const refreshAccessTokenUser = async (refreshToken) => {

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    let payload;
    try {
        payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }

    const tokenRecord = await RefreshToken.findOne({ token: refreshToken });

    if (!tokenRecord) {
        throw new ApiError(401, "Refresh token not found");
    }

    const user = await User.findById(payload.userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = generateAccessToken(user);

    return accessToken;
};

export const logoutUser = async (refreshToken) => {

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    await RefreshToken.deleteOne({
        token: refreshToken
    });
};
