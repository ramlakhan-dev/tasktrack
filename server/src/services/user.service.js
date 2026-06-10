import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

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
