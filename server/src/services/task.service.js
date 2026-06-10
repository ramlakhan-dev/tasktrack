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
