import mongoose, { Schema, Document } from "mongoose";

interface ClientDocument extends Document {
  name: string;
  email: string;
  phone: string;
}

const ClientSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
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

const Client = mongoose.model<ClientDocument>("client", ClientSchema);
export { Client };
