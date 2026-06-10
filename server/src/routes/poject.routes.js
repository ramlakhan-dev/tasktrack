import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createProject,
    deleteProject,
    getProject,
    getProjects,
    updateProject
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/",
    createProject
);

router.get(
    "/",
    getProjects
);

router.get(
    "/:projectId",
    getProject
);

router.patch(
    "/:projectId",
    updateProject
);

router.delete(
    "/:projectId",
    deleteProject
);

export default router;
