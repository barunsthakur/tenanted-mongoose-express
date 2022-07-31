import mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema(
    {
      name: String
    }, 
    { timestamps: true }
)

