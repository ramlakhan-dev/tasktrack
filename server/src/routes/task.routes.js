import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createTask
} from "../controllers/task.controller.js";

const router = express.Router({
    mergeParams: true
});

router.use(authMiddleware);

router.post(
    "/",
    createTask
);

export default router;
