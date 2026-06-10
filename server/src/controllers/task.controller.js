import {
    createUserTask,
    deleteUserTask,
    getUserTasks,
    updateUserTask
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

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await getUserTasks(req.user._id, req.params.projectId);
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await updateUserTask(req.user._id, req.params.projectId, req.params.taskId, req.body);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await deleteUserTask(req.user._id, req.params.projectId, req.params.taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
