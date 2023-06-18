import mongoose, { Document, Schema } from "mongoose";

interface ProjectDocument extends Document {
  name: string;
  description: string;
  status: string;
}

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Started", "In process", "Completed"],
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.created_at;
        delete ret.updated_at;
      },
    },
  }
);

const Project = mongoose.model<ProjectDocument>("project", ProjectSchema);

export { Project };
