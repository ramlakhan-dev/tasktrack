import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
    createProject
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/",
    createProject
);


export default router;
