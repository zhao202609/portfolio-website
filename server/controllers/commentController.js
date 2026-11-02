import Comment from '../models/Comment.js';
import BlogPost from '../models/BlogPost.js';

// @route GET /api/blog/:postId/comments
// @desc  Get all comments for a specific blog post (Public)
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// @route POST /api/blog/:postId/comments
// @desc  Create a comment for the post, by the logged-in user (Protected)
const createComment = async (req, res, next) => {
  try {
    const { body } = req.body;
    if (!body) {
      return res.status(400).json({ message: 'Comment body is required' });
    }

    const post = await BlogPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: req.params.postId,
    });
    await comment.populate('author', 'username');
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export { getComments, createComment };
