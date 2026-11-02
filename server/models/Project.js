import mongoose from 'mongoose';

// Project Model (Portfolio projects)
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    imageUrl: {
      type: String,
      required: false,
    },
    repoUrl: {
      type: String,
      required: false,
    },
    liveUrl: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
      enum: ['HTML/CSS', 'JavaScript', 'React', 'Full-Stack', 'Data'],
      default: 'Full-Stack',
    },
    tags: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
