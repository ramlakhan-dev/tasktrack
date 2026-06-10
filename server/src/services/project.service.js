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

export const getUserProjects = async (userId) => {
    const projects = await Project.find({
        userId
    }).sort({ createdAt: -1 });
    
    return projects;
};

export const getUserProject = async (userId, projectId) => {
    const project = await Project.findOne({
        _id: projectId,
        userId: userId
    });

    return project;
};

export const updateUserProject = async (userId, projectId, projectData) => {
    
    const project = await Project.findOneAndUpdate(
        {
            _id: projectId,
            userId: userId
        },
        projectData,
        {
            new: true,
            runValidators: true
        }
    );

    return project;
};

export const deleteUserProject = async (userId, projectId) => { 
    return await Project.findOneAndDelete({
        _id: projectId,
        userId: userId
    });
};
