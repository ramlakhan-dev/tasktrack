import {
    createUserProject,
    deleteUserProject,
    getUserProject,
    getUserProjects,
    updateUserProject
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


export const getProject = async (req, res, next) => {
    try {
        const project = await getUserProject(req.user._id, req.params.projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        const project = await updateUserProject(req.user._id, req.params.projectId, req.body);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProject = async (req, res, next) => {
    try {
        const project = await deleteUserProject(req.user._id, req.params.projectId);
        if (!project) {
            return res.status(404).json({
                success: true,
                message: "Project not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
