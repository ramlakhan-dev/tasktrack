import express from "express";
import { updateProfile, getProfile } from "../controllers/user.controller.js";
import { uploadAvatar } from "../middlewares/upload.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put(
    "/profile",
    authMiddleware,
    uploadAvatar.single("avatar"),
    updateProfile
);

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

export default router;
