import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    register,
    verify,
    login,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
    logout
} from "../controllers/auth.controller.js";
import {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation
} from "../validators/auth.validator.js";
import { validate } from "../middlewares/validationErrorHandler.js";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validate,
    register
);
router.get("/verify-email", verify);

router.post(
    "/login",
    loginValidation,
    validate,
    login
);

router.post(
    "/forgot-password",
    forgotPasswordValidation,
    validate,
    forgotPassword
);
router.post(
    "/reset-password",
    resetPasswordValidation,
    validate,
    resetPassword
);

router.post(
    "/refresh",
    refreshAccessToken
);

router.post(
    "/logout",
    authMiddleware,
    logout
);

export default router;