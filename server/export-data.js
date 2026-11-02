// Export script: pulls the current Projects, Blog Posts, Comments and
// Messages from MongoDB Atlas and writes them to server/data/backup.json.
// Run this after adding/editing/deleting content in the Admin dashboard so
// the latest data is kept inside the project folder.
//
// Run with:  node export-data.js
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Project from './models/Project.js';
import BlogPost from './models/BlogPost.js';
import Comment from './models/Comment.js';
import Message from './models/Message.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB, exporting data...');

    const [projects, posts, comments, messages] = await Promise.all([
      Project.find().sort({ createdAt: 1 }).lean(),
      BlogPost.find().sort({ createdAt: 1 }).lean(),
      Comment.find().sort({ createdAt: 1 }).lean(),
      Message.find().sort({ createdAt: 1 }).lean(),
    ]);

    const data = {
      exportedAt: new Date().toISOString(),
      projects,
      blogPosts: posts,
      comments,
      messages,
    };

    const dir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const out = path.join(dir, 'backup.json');
    fs.writeFileSync(out, JSON.stringify(data, null, 2), 'utf8');

    console.log(
      `Exported: ${projects.length} projects, ${posts.length} posts, ${comments.length} comments, ${messages.length} messages -> ${out}`
    );
  } catch (err) {
    console.error('Export error:', err);
  } finally {
    await mongoose.disconnect();
  }
};

run();
