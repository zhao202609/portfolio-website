# Full-Stack Personal Portfolio & Blog — Capstone Project

**Course:** Web Data Management and Application
**Project Type:** Cumulative Full-Stack Capstone Project (100 marks)

A complete, production-ready Full-Stack Personal Portfolio Website consisting of:

- **Back-End API** (`/server`) — a secure, scalable RESTful API built with **Node.js + Express**, using **Mongoose** models and a cloud-hosted **MongoDB Atlas** database. It manages projects, skills, contact messages, and a full-featured Blog API with JWT authentication and comments.
- **Front-End SPA** (`/client`) — a modern **React** Single Page Application (built with Vite) that consumes all back-end endpoints, with React Router, Context API authentication state, controlled forms, and a protected Admin Dashboard.

## Live Deployed Sites

- **Front-End URL (Cloudflare Pages):** https://portfolio-website-bt2.pages.dev
- **Back-End URL (Render):** https://portfolio-website-01b2.onrender.com

---

## Tech Stack

| Layer   | Technologies |
|---------|--------------|
| Back-end | Node.js, Express, Mongoose, MongoDB Atlas, JWT, bcryptjs, helmet, cors, dotenv |
| Front-end | React (Vite), React Router, Context API, Axios, responsive CSS |
| Deployment | Back-end: Render — Front-end: Cloudflare Pages |

## Project Structure

```
CapstoneProject/
├── server/                 # Express REST API (MVC)
│   ├── config/db.js        # MongoDB Atlas connection
│   ├── models/             # User, Project, BlogPost, Comment, Message
│   ├── routes/             # route definitions
│   ├── controllers/        # request handlers / business logic
│   ├── middleware/         # auth (protect) + central error handler
│   ├── server.js           # app entry point
│   └── .env.example
└── client/                 # React SPA
    ├── src/
    │   ├── components/     # Header, Footer, cards, ProtectedRoute
    │   ├── pages/          # Home, Projects, Blog, BlogDetail, Contact, Login, Register, Admin
    │   ├── context/        # AuthContext (Context API)
    │   ├── api.js          # axios instance (attaches JWT)
    │   └── App.jsx         # routes
    └── .env.example
```

---

## How to Run Locally

### Prerequisites

- Node.js (v18 or later) and npm
- A free MongoDB Atlas cluster (to obtain a connection string)

### 1. Run the Back-End

```bash
cd server
npm install
copy .env.example .env        # Windows  (on macOS/Linux: cp .env.example .env)
```

Edit `server/.env` and fill in:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=any_long_random_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

Then start the API:

```bash
npm run dev      # auto-reload with nodemon
# or
npm start
```

The API runs on `http://localhost:5000`.

### 2. Run the Front-End

Open a second terminal:

```bash
cd client
npm install
copy .env.example .env        # Windows  (on macOS/Linux: cp .env.example .env)
```

Confirm `client/.env` points at the back-end:

```
VITE_API_URL=http://localhost:5000
```

Then start the dev server:

```bash
npm run dev
```

The site runs on `http://localhost:5173` and communicates with the API on port 5000.

### 3. First Use

1. Register a new account at `/register` (this becomes the admin/author account).
2. You are redirected to `/admin` where you can create Projects and Blog Posts.
3. Explore the public pages; open a blog post while logged in to leave a comment.

---

## API Endpoints

### Auth — Users

| Method | Endpoint | Access | Purpose | Expected body |
|--------|----------|--------|---------|---------------|
| POST | `/api/users/register` | Public | Create a new user (hashed password) | `{ username, email, password }` (password ≥ 6 chars) |
| POST | `/api/users/login` | Public | Authenticate and return a JWT | `{ email, password }` |

### Portfolio — Projects

| Method | Endpoint | Access | Purpose | Expected body / params |
|--------|----------|--------|---------|------------------------|
| GET | `/api/projects` | Public | Get all projects | — |
| GET | `/api/projects/:id` | Public | Get one project | URL param `:id` |
| POST | `/api/projects` | Protected (admin) | Create a project | `{ title, description, imageUrl?, repoUrl?, liveUrl? }` + `Authorization: Bearer <token>` |
| PUT | `/api/projects/:id` | Protected (admin) | Update a project | any of the above fields + `:id` |
| DELETE | `/api/projects/:id` | Protected (admin) | Delete a project | URL param `:id` |

### Portfolio — Contact

| Method | Endpoint | Access | Purpose | Expected body |
|--------|----------|--------|---------|---------------|
| POST | `/api/contact` | Public | Save a contact message | `{ name, email, message }` |

### Blog — Posts

| Method | Endpoint | Access | Purpose | Expected body / params |
|--------|----------|--------|---------|------------------------|
| GET | `/api/blog` | Public | Get all posts (populated with author username) | — |
| GET | `/api/blog/:id` | Public | Get one post with author + comments | URL param `:id` |
| POST | `/api/blog` | Protected | Create a post | `{ title, content }` + Bearer token |
| PUT | `/api/blog/:id` | Protected & author | Update a post (author only) | `{ title?, content? }` + `:id` |
| DELETE | `/api/blog/:id` | Protected & author | Delete a post and its comments | URL param `:id` |

### Blog — Comments

| Method | Endpoint | Access | Purpose | Expected body / params |
|--------|----------|--------|---------|------------------------|
| GET | `/api/blog/:postId/comments` | Public | Get all comments for a post | URL param `:postId` |
| POST | `/api/blog/:postId/comments` | Protected | Add a comment | `{ body }` + Bearer token + `:postId` |

> All protected endpoints require an `Authorization: Bearer <JWT>` header.

---

## Security & Implementation Notes

- Passwords are hashed with **bcryptjs** before storage.
- JWTs are signed with `JWT_SECRET` and verified by the `protect` middleware.
- Blog posts can only be edited/deleted by their original author.
- **helmet** sets secure HTTP headers; **dotenv** keeps all secrets out of source code.
- A central error-handling middleware returns consistent JSON errors.
- CORS is restricted to the configured `CLIENT_URL`.

---

## Deployment Summary

- **Back-end:** deploy the `server` folder to Render (Root Directory = `server`, Build `npm install`, Start `npm start`, Free instance), set `MONGO_URI`, `JWT_SECRET` and `CLIENT_URL` environment variables.
- **Front-end:** deploy the `client` folder to Cloudflare Pages (Root Directory = `client`, Framework preset React (Vite), Build `npm run build`, Output `dist`), set `VITE_API_URL` to the live back-end URL. The `client/public/_redirects` file handles SPA routing.

## Submission Checklist (Chaoxing)

- [x] Live Front-End URL — https://portfolio-website-bt2.pages.dev
- [x] Live Back-End URL — https://portfolio-website-01b2.onrender.com
- [ ] ZIP named `StudentID_StudentName_CapstoneProject.zip` containing `server` and `client`
- [ ] All `node_modules` folders deleted/excluded before zipping
- [ ] This `README.md` included in the zip root
