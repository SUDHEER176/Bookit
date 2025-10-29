import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Create indexes
experienceSchema.index({ category: 1 });
experienceSchema.index({ location: 1 });

export default mongoose.model<IExperience>('Experience', experienceSchema);

