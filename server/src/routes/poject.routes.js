import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createProject,
    getProject,
    getProjects
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

export default router;
