import BlogPost from '../models/BlogPost.js';
import Comment from '../models/Comment.js';

// @route GET /api/blog
// @desc  Get all blog posts, populated with the author's username (Public)
const getPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// @route GET /api/blog/:id
// @desc  Get a single post, populated with author username and all comments (Public)
const getPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const comments = await Comment.find({ post: req.params.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({ post, comments });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/blog
// @desc  Create a blog post (Protected)
const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const post = await BlogPost.create({
      title,
      content,
      author: req.user._id,
    });
    await post.populate('author', 'username');
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/blog/:id
// @desc  Update a blog post (Protected & Authorized: author only)
const updatePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('author', 'username');
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/blog/:id
// @desc  Delete a blog post and its comments (Protected & Authorized: author only)
const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    await Comment.deleteMany({ post: req.params.id });
    res.status(200).json({ message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
