import mongoose, { Schema, Document } from "mongoose";

export interface AuthorInterface extends Document {
  name: string;
  biography: string;
  nationality: string;
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  biography: { type: String, required: true },
  nationality: { type: String, required: true },
});

export default mongoose.model<AuthorInterface>("Author", AuthorSchema);
