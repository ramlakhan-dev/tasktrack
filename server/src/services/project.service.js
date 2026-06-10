import Project from "../models/project.model.js";

export const createUserProject = async (userId, projectDate) => {
    const { projectName, description } = projectDate;

    const project = await Project.create({
        projectName,
        description,
        userId
    });

    return project;
};

