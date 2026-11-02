// Seed script: creates five blog posts based on the WDMA back-end labs
// (Lab 3-4 through Lab 14). The author is the student's own account.
// Running it replaces the seeded blog posts (it does not delete posts you
// add manually later that have a different title).
//
// Run with:  node seed-blog.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import BlogPost from './models/BlogPost.js';

dotenv.config();

const posts = [
  {
    title: 'My First REST API with Express (Lab 3–4)',
    content: `In Labs 3 and 4 I built my first back-end server with Node.js and Express. Before this, I had only made static web pages, so it was exciting to see the server actually reply with data.

Key points I learned:

1. Express is a Node.js framework. We create an application with express() and start it with app.listen(PORT).

2. A route decides what happens when a request comes in. For example, app.get('/api/posts', ...) runs when someone visits that URL, and req.params.id is used to read the id from the URL on /api/posts/:id.

3. The four common HTTP verbs map to simple actions: GET reads data, POST creates data, PUT updates it, and DELETE removes it. This is the basic idea behind a REST API.

4. To read JSON sent by a client, the line app.use(express.json()) is required. Without it, req.body is empty. This was a small detail that caused a bug until I added it.

5. We send data back with res.json(data) and set status codes such as 200 (OK) and 201 (Created).

Summary
In these two labs I learned how a web server receives requests and returns JSON, how routes and URL parameters work, and why express.json() is needed to read the request body. This was my first step from building pages to building a real API.`,
  },
  {
    title: 'Connecting to MongoDB Atlas with dotenv (Lab 5–6)',
    content: `In Labs 5 and 6 I moved away from hard-coded data and connected my application to a real cloud database on MongoDB Atlas.

Key points I learned:

1. MongoDB Atlas hosts the database online, so the data is not stored on my own computer and can be shared by the deployed application.

2. We connect using a connection string and the MongoDB driver's MongoClient. The code waits for client.connect() to succeed before using the database.

3. The connection string is secret, so it must not be written directly in the code. We put it in a .env file and load it with dotenv using process.env.MONGO_URI.

4. My first database operations were simple: insertOne() to add a document and find() to read documents back.

5. A safe practice is to connect to the database first, and only start the Express server after the connection succeeds.

Summary
These labs taught me how to connect a Node.js app to a cloud MongoDB database, how to keep the connection string private in a .env file, and how to insert and read documents. This made the API's data persistent instead of temporary.`,
  },
  {
    title: 'Building Full CRUD with MongoDB (Lab 8)',
    content: `In Lab 8 I completed the four CRUD operations — Create, Read, Update and Delete — for blog posts using MongoDB.

Key points I learned:

1. Create uses insertOne(req.body), which saves the data the client sent.

2. Read uses find() for all posts and findOne() for one post. To find a single document by id, the id from the URL must be converted with new ObjectId(id).

3. Update uses updateOne() with a filter and $set. The $set operator only changes the fields that are sent.

4. Delete uses deleteOne(). The result fields modifiedCount and deletedCount tell us whether any document actually changed; if they are 0, the post does not exist and we return a 404 error.

5. Every database operation is asynchronous, so I used async/await and wrapped the code in try/catch to return a 500 error if something goes wrong.

Summary
In this lab I mapped the HTTP verbs to real database operations: POST inserts, GET reads, PUT updates with $set, and DELETE removes. I also learned how to use ObjectId and how to handle both "not found" (404) and server errors (500) properly.`,
  },
  {
    title: 'Organising Code with Mongoose and the MVC Pattern (Lab 9–12)',
    content: `In Labs 9 to 12 my code was refactored. Earlier, everything was written in one big server.js file. These labs introduced Mongoose models, controllers and a central error handler.

Key points I learned:

1. Mongoose lets us define a Schema. For a Post, the title and content are required, and timestamps: true automatically adds created and updated times.

2. A Mongoose Model is created from the schema, and methods like Post.create(), Post.find() and Post.findByIdAndUpdate() are then used in the code.

3. The code was split into routes, controllers and models. Routes only decide which controller runs; controllers contain the logic; models define the data. This is the MVC idea and it makes each file short and easy to manage.

4. findByIdAndUpdate(..., { new: true, runValidators: true }) returns the updated document and still validates the new data.

5. Instead of handling errors everywhere, errors are passed with next(error) to one central error-handling middleware, which always sends JSON in the same format.

Summary
These labs taught me how to structure a back-end application in the MVC style, how Mongoose schemas and models work, and how a central error handler keeps responses consistent. The project became much more organised than a single server.js file.`,
  },
  {
    title: 'Password Security with bcrypt and JWT (Lab 14)',
    content: `In Lab 14 I added user registration and login. This was the most security-focused lab, because passwords must never be stored in plain text.

Key points I learned:

1. On registration, the password is hashed automatically using a pre-save Mongoose hook. bcrypt.genSalt() creates a salt and bcrypt.hash() turns the password into a long string that cannot be read back.

2. On login, bcrypt.compare() checks the entered password against the stored hash using a method called matchPassword. We never see the real password.

3. When login succeeds, a JSON Web Token (JWT) is generated with jwt.sign(). The token contains the user's id and is sent back to the client.

4. The client stores the token and sends it in the Authorization header when it requests protected routes, so the server can identify the user without asking for the password again.

5. A duplicate email returns a 400 error, and wrong login details return a generic 401 "Invalid email or password" message.

Summary
This lab showed me how authentication works end to end: bcrypt hashes passwords before saving, bcrypt.compare verifies them on login, and JWT issues a token that identifies the user for protected routes. I also learned why central error handling is important for returning clear, consistent messages.`,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB, seeding blog posts...');

    // Prefer the student's own account, otherwise the first user.
    let author =
      (await User.findOne({ username: '赵慧洁' })) ||
      (await User.findOne({ email: '2044948658@qq.com' })) ||
      (await User.findOne());

    if (!author) {
      console.error('No user found. Please register an account first.');
      return;
    }
    console.log(`Author: ${author.username} (${author.email})`);

    for (const data of posts) {
      const exists = await BlogPost.findOne({ title: data.title });
      if (!exists) {
        await BlogPost.create({ ...data, author: author._id });
      }
    }

    const count = await BlogPost.countDocuments();
    console.log(`Blog seeding complete. Total posts now: ${count}.`);
  } catch (err) {
    console.error('Blog seed error:', err);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
