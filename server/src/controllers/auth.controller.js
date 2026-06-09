import {
    registerUser,
    verifyEmail
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