import {
    createUserTask
} from "../services/task.service.js";

export const createTask = async (req, res, next) => {
    try {
        const task = await createUserTask(req.user._id, req.params.projectId, req.body);

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
};
