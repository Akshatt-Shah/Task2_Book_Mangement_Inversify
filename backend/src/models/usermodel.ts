import mongoose, { Schema, Document } from "mongoose";

// Define enum for user types
enum UserType {
  Admin = "admin",
  User = "user",
  Author = "author",
}

export interface UserInterface extends Document {
  name: string;
  password: string;
  type: UserType; // Using the defined enum
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, enum: Object.values(UserType), required: true }, 
});

export default mongoose.model<UserInterface>("User", UserSchema);
