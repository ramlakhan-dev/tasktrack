import ApiError from "../utils/apiError.js";
import crypto from "crypto";
import sendEmail from  "../utils/sendEmail.js";
import User from "../models/user.model.js";
import VerificationToken from "../models/verificationtoken.model.js";

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
