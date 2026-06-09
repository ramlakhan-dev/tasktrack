import express from "express";

const app = express();

app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
    });
});


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

export default app;
