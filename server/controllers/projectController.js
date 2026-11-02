import Project from '../models/Project.js';

// @route GET /api/projects
// @desc  Get all projects (Public)
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('user', 'username').sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// @route GET /api/projects/:id
// @desc  Get a single project (Public)
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'username');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// @route POST /api/projects
// @desc  Create a project (Protected / admin)
const createProject = async (req, res, next) => {
  try {
    const { title, description, imageUrl, repoUrl, liveUrl } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const project = await Project.create({
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl,
      user: req.user._id,
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/projects/:id
// @desc  Update a project (Protected / admin)
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/projects/:id
// @desc  Delete a project (Protected / admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
