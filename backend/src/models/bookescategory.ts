import mongoose, { Schema, Document } from "mongoose";

// Define enum for user types
enum BookType {
  fiction = "fiction",
  non_fiction = "non_fiction",
  romance = "romance",
  thriller = "thriller",
}

export interface BookCategoryInterface extends Document {
  name: BookType; // Using the defined enum
}

const BookSchema: Schema = new Schema({
  name: {
    type: String,
    enum: Object.values(BookType),
    required: true,
    unique: true,
  }, // Using enum constraint
});

export default mongoose.model<BookCategoryInterface>("Books", BookSchema);
