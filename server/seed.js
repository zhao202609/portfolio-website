// Seed script: rebuilds the portfolio project collection from the
// Web Data Management lab exercises, with category + tags.
// Running it wipes the projects collection and recreates all projects.
//
// Run with:  node seed.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Project from './models/Project.js';

dotenv.config();

const projects = [
  {
    title: 'My First Personal Page',
    category: 'HTML/CSS',
    tags: ['HTML5', 'Tags', 'Links', 'Lab 1-3'],
    description:
      'The very first web pages I wrote in plain HTML — headings, paragraphs, lists, links and images put together into a simple personal page.',
  },
  {
    title: 'Styled Portfolio with CSS',
    category: 'HTML/CSS',
    tags: ['CSS3', 'Flexbox', 'Selectors', 'Lab 4-6'],
    description:
      'I added a stylesheet to my portfolio: colours, fonts and Flexbox layout, and placed my own photo on the page.',
  },
  {
    title: 'Interactive Portfolio with the DOM',
    category: 'JavaScript',
    tags: ['JavaScript', 'DOM', 'Events', 'Lab 7-9'],
    description:
      'Using JavaScript in main.js to select elements, listen for clicks and toggle content, so the page finally responds to the user.',
  },
  {
    title: 'GitHub Repos Explorer',
    category: 'JavaScript',
    tags: ['Fetch', 'REST', 'JSON', 'Lab 10'],
    description:
      'I called the public GitHub API with fetch() and built project cards from the JSON data that came back.',
  },
  {
    title: 'React Portfolio SPA',
    category: 'React',
    tags: ['React', 'Components', 'Vite', 'Lab 11-16'],
    description:
      'The portfolio rebuilt in React with Vite — split into Header, About, Projects and Contact components that share data through props.',
  },
  {
    title: 'First Express Server & Routes',
    category: 'Full-Stack',
    tags: ['Node.js', 'Express', 'Routing', 'Lab 1-4'],
    description:
      'My first Node.js server with Express, returning JSON from GET routes such as /api/posts instead of a fixed HTML file.',
  },
  {
    title: 'MongoDB CRUD API',
    category: 'Full-Stack',
    tags: ['MongoDB', 'Mongoose', 'CRUD', 'dotenv', 'Lab 5-10'],
    description:
      'I connected to MongoDB Atlas with a connection string in .env, modelled data with Mongoose and built create, read, update and delete endpoints.',
  },
  {
    title: 'MVC Structure & User Login',
    category: 'Full-Stack',
    tags: ['MVC', 'bcrypt', 'JWT', 'Middleware', 'Lab 11-16'],
    description:
      'Code organised into models, routes and controllers, with passwords hashed by bcrypt and protected routes using a JWT token.',
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB, seeding...');

    // Reuse the first user (admin) or create a default one.
    let user = await User.findOne();
    if (!user) {
      const hashed = await bcrypt.hash('test123456', 10);
      user = await User.create({
        username: 'testadmin',
        email: 'testadmin@example.com',
        password: hashed,
      });
      console.log('Created default admin: testadmin@example.com / test123456');
    }

    await Project.deleteMany({});
    const docs = projects.map((p) => ({ ...p, user: user._id }));
    await Project.insertMany(docs);

    const total = await Project.countDocuments();
    console.log(`Seeding complete. ${total} projects created.`);
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
