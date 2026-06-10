import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: [true, "Project name is required"],
            trim: true,
            maxlength: 100
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: ""
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
