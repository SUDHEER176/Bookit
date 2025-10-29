import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  experienceId: string;
  userId: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  promoCode?: string;
  discountAmount?: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  experienceId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  taxes: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  promoCode: {
    type: String,
  },
  discountAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
  }
}, {
  timestamps: true,
});

export default mongoose.model<IBooking>('Booking', bookingSchema);