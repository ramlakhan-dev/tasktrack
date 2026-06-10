import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import RefreshToken from "../models/refreshtoken.model.js";

export const updateUserProfile = async (userId, data, file) => {
    
    const updateData = {
        name: data.name,
        bio: data.bio
    };

    if (file) {
        updateData.avatar = `/uploads/avatars/${file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
        userId,
        updateData
    );
};

export const getUserProfile = async (userId) => {
    
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};

export const changeUserPassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId).select("+password");

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        throw new ApiError(400, "Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();
};

export const deleteUserAccount = async (userId, password) => {
    const user = await User.findById(userId).select("+password");

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new ApiError(400, "Invalid password");
    }

    await User.findByIdAndDelete(userId);
    await RefreshToken.deleteMany({
        userId: user._id
    });
};
