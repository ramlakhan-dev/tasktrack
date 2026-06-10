import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createProject,
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

export default router;
