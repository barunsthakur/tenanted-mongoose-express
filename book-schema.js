import mongoose from 'mongoose';
import { withCon } from './connection-factory.js';

export const bookSchema = new mongoose.Schema(
    {
      name: String
    }, 
    { timestamps: true }
)

export const Book = () => withCon(db => {
  return db.model("Book", bookSchema);
})