import mongoose from 'mongoose';

// BlogPost Model (Blog articles)
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog post title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Blog post content is required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true } // auto-generated createdAt / updatedAt
);

export default mongoose.model('BlogPost', blogPostSchema);
