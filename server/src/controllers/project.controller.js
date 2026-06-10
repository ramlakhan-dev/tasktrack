import {
    createUserProject,
    getUserProjects
} from "../services/project.service.js";

export const createProject = async (req, res, next) => {
    try {
        const project = await createUserProject(req.user._id, req.body);
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const getProjects = async (req, res, next) => { 
    try {
        const projects = await getUserProjects(req.user._id);
        res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: projects
        })
    } catch (error) {
        next(error);
    }
};
