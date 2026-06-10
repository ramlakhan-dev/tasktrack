import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createTask,
    deleteTask,
    getTasks,
    updateTask
} from "../controllers/task.controller.js";

const router = express.Router({
    mergeParams: true
});

router.use(authMiddleware);

router.post(
    "/",
    createTask
);

router.get(
    "/",
    getTasks
);

router.patch(
    "/:taskId",
    updateTask
);

router.delete(
    "/:taskId",
    deleteTask
);

export default router;
