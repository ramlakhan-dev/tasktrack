import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/poject.routes.js";
import path from "path";

const app = express();

app.use("/uploads", express.static(path.resolve("uploads")));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes)

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
    });
});

app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

export default app;
