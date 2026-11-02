# Capstone Project — Personal Portfolio & Blog

Course: Web Data Management and Application
Name: Zhao Huijie (Student ID: 24998048)

## Overview

This is my full-stack personal portfolio website. The back-end is a REST API
built with Node.js, Express and MongoDB. The front-end is a single-page React
app built with Vite. It shows my projects, blog posts and a contact form, and
includes login and an admin page.

## Live Links

- Front-end: https://portfolio-website-bt2.pages.dev
- Back-end: https://portfolio-website-01b2.onrender.com

## How to Run Locally

1. Back-end: in the `server` folder, run `npm install`, then `npm start`.
2. Front-end: in the `client` folder, run `npm install`, then `npm run dev`.
3. Open http://localhost:5173 in the browser.

## API Endpoints

Auth:

- POST `/api/users/register` — register
- POST `/api/users/login` — login, returns a token

Projects:

- GET `/api/projects` — get all projects
- GET `/api/projects/:id` — get one project
- POST `/api/projects` — add a project (admin)
- PUT `/api/projects/:id` — update a project (admin)
- DELETE `/api/projects/:id` — delete a project (admin)

Contact:

- POST `/api/contact` — send a contact message

Blog posts:

- GET `/api/blog` — get all posts
- GET `/api/blog/:id` — get one post
- POST `/api/blog` — add a post (logged in)
- PUT `/api/blog/:id` — update a post (author)
- DELETE `/api/blog/:id` — delete a post (author)

Comments:

- GET `/api/blog/:postId/comments` — get comments
- POST `/api/blog/:postId/comments` — add a comment (logged in)
