import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // MongoDB connection URL - replace with your actual MongoDB URL
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookit';
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB Connected Successfully!');
    
    // Create indexes for better query performance
    await createIndexes();
    
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  const collections = mongoose.connection.collections;
  
  // Create indexes for the bookings collection
  if (collections.bookings) {
    await collections.bookings.createIndex({ userId: 1 });
    await collections.bookings.createIndex({ experienceId: 1 });
    await collections.bookings.createIndex({ status: 1 });
    await collections.bookings.createIndex({ createdAt: -1 });
  }
};

export default connectDB;