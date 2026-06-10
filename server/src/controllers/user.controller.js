import {
    updateUserProfile,
    getUserProfile,
    changeUserPassword,
    deleteUserAccount
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

export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        await changeUserPassword(
            req.user._id,
            currentPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAccount = async (req, res, next) => {
    try {
        const { password } = req.body;

        await deleteUserAccount(req.user._id, password);

        res.clearCookie(
            "accessToken",
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            }
        );

        res.clearCookie(
            "refreshToken",
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict"
            }
        );

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
