import express from "express";
import {
    register,
    verify
} from "../controllers/auth.controller.js";
import { registerValidation } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validationErrorHandler.js";

const router = express.Router();

router.post(
    "/register",
    registerValidation,
    validate,
    register
);
router.get("/verify-email", verify);


export default router;