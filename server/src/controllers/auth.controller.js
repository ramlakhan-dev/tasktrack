import {
    registerUser,
    verifyEmail,
    loginUser,
    forgotPasswordUser,
    resetPasswordUser,
    refreshAccessTokenUser
} from "../services/auth.service.js";


export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "Registration successful. Please verify your email",
            user: user
        });
    } catch (error) {
        next(error);
    }
};


export const verify = async (req, res, next) => {
    try {
        const { token } = req.query;

        const isVerified = await verifyEmail(token);

        if (isVerified) {
            return res.status(200).json({
                success: true,
                message: "Email verified successfully"
            });
        }
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { user, accessToken, refreshToken } = await loginUser(req.body);

        res.cookie(
            "accessToken",
            accessToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: user
        });
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        await forgotPasswordUser(email);

        res.status(200).json({
            success: true,
            message: "Password reset link sent. Please check your email"
        });
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.query;
        const { password } = req.body;

        const isPasswordReset = await resetPasswordUser(token, password);
        if (isPasswordReset) {
            return res.status(200).json({
                success: true,
                message: "Password reset successful"
            });
        }
    } catch (error) {
        next(error);
    }
};

export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        const accessToken = await refreshAccessTokenUser(refreshToken);

        res.cookie(
            "accessToken",
            accessToken,
            {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 15 * 60 * 1000 
            }
        )

        res.status(200).json({
            success: true,
            message: "Token refreshed successfully"
        })
    } catch (error) {
        next(error);
    }
};
