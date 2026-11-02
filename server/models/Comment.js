import mongoose from 'mongoose';

// Comment Model (comments on a BlogPost)
const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Comment body is required'],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost',
      required: true,
    },
  },
  { timestamps: true } // auto-generated createdAt / updatedAt
);

export default mongoose.model('Comment', commentSchema);
