import mongoose from 'mongoose';

// Message Model (Portfolio contact form submissions)
const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
  },
  { timestamps: true } // auto-generated createdAt / updatedAt
);

export default mongoose.model('Message', messageSchema);
