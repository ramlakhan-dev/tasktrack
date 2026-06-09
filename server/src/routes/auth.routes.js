import express from "express";
import {
    register,
    verify,
    login
} from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validators/auth.validator.js";
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


export default router;