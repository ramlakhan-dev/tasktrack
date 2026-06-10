import Task from "../models/task.model.js";

export const createUserTask = async (userId, projectId, taskData) => { 

    const { title, description } = taskData;

    const task = await Task.create({
        title: title,
        description: description,
        projectId: projectId,
        userId: userId
    });

    return task;
};

export const getUserTasks = async (userId, projectId) => {
    const tasks = await Task.find({
        projectId: projectId,
        userId: userId
    }).sort({ createdAt: -1 });

    return tasks;
};

export const updateUserTask = async (userId, projectId, taskId, taskData) => {
    const task = await Task.findOneAndUpdate(
        {
            _id: taskId,
            projectId: projectId,
            userId: userId
        },
        taskData,
        {
            new: true,
            runValidators: true
        }
    );

    return task;
};
