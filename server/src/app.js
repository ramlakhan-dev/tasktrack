import express from "express";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

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
