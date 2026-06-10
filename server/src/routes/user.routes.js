import express from "express";
import { updateProfile, getProfile, changePassword, deleteAccount } from "../controllers/user.controller.js";
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

router.patch(
    "/change-password",
    authMiddleware,
    changePassword
);

router.delete(
    "/account",
    authMiddleware,
    deleteAccount
);

export default router;
