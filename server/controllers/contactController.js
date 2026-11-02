import Message from '../models/Message.js';

// @route POST /api/contact
// @desc  Receive the portfolio contact form and save a new Message (Public)
const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const saved = await Message.create({ name, email, message });
    res.status(201).json({ message: 'Your message has been sent successfully', id: saved._id });
  } catch (error) {
    next(error);
  }
};

export { submitContact };
