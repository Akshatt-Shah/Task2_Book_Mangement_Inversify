import mongoose, { Schema, Document } from "mongoose";
import usermodel from "./usermodel";
import bookescategory from "./bookescategory";

export interface BookrInterface extends Document {
  title: string;
  author: Number;
  category: Number;
  isbn: Number;
  description: string;
  price: Number;
}
//
const BookSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: Schema.ObjectId, ref: usermodel, required: true },
  category: { type: Schema.ObjectId, ref: bookescategory, required: true },
  isbn: { type: Number, length: 13, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
});

export default mongoose.model<BookrInterface>("Bookdetail", BookSchema);
