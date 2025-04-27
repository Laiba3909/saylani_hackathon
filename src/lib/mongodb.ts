import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
   
    if (mongoose.connections[0].readyState) {
      console.log('MongoDB is already connected');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
};

export default connectMongo;

