import {
    updateUserProfile,
    getUserProfile
} from "../services/user.service.js";

export const updateProfile = async (req, res, next) => {
    try {
        const user = await updateUserProfile(req.user._id, req.body, req.file);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await getUserProfile(req.user._id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};
