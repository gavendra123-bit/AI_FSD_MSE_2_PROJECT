# Lost & Found Item Management System

A MERN stack web application for a college campus to manage lost and found personal belongings securely.

## Features

- Student registration and login with hashed passwords
- JWT-based authentication
- Add lost/found item reports
- View all reported items
- Search items by name and category
- Update or delete only your own item entries
- Protected dashboard route
- Logout by clearing stored token

## Tech Stack

- MongoDB
- Express.js
- React + Vite
- Node.js
- Bootstrap + custom CSS

## Project Structure

```text
.
├── backend
├── frontend
├── render.yaml
└── README.md
```

## MongoDB Schemas

### User

- `name`
- `email` (unique)
- `password` (hashed)

### Item

- `itemName`
- `description`
- `type` (`Lost` or `Found`)
- `category`
- `location`
- `date`
- `contactInfo`
- `user` (reference to `User`)

## Backend API Endpoints

### Authentication

- `POST /api/register`
- `POST /api/login`
- `GET /api/dashboard`

### Items

- `POST /api/items`
- `GET /api/items`
- `GET /api/items/:id`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`
- `GET /api/items/search?name=xyz&category=abc`

## Local Setup

### 1. Install dependencies

```bash
npm install
npm run install:all
```

### 2. Configure environment variables

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/lost-found-app
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000/api
```

### 3. Run the project

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

## Render Deployment

### Backend

1. Push project to GitHub.
2. Create a new Render Web Service for `backend`.
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
4. Use:
   - Build command: `npm install`
   - Start command: `npm start`

### Frontend

1. Create a Render Static Site for `frontend`.
2. Add `VITE_API_URL` with your deployed backend URL.
   Example: `https://your-backend-name.onrender.com`
3. Use:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`

You can also use the included [render.yaml](/Users/gavendrapachahra/Desktop/AI_FSD_MSE2/render.yaml) as a Render Blueprint.

## Vercel Deployment

Deploy the `frontend` folder on Vercel:

1. Import GitHub repository into Vercel.
2. Set root directory to `frontend`.
3. Add environment variable:
   - `VITE_API_URL=https://your-backend-name.onrender.com`
4. Build command: `npm run build`
5. Output directory: `dist`

The included [vercel.json](/Users/gavendrapachahra/Desktop/AI_FSD_MSE2/frontend/vercel.json) supports SPA routing.

### Important Deployment Variables

- Frontend `VITE_API_URL`: `https://your-backend-name.onrender.com`
- Backend `CLIENT_URL`: your deployed frontend URL
  Example: `https://your-frontend-name.onrender.com` or your Vercel URL

## Suggested Report Contents

Include these sections in your report/document before exporting to PDF:

1. Title page with name, roll number, subject, and case study title
2. Problem statement and objectives
3. MongoDB schemas
4. Backend code and API endpoint explanation
5. Frontend pages and component screenshots
6. Postman/Thunder Client request screenshots
7. MongoDB collection screenshots
8. Render deployment screenshots
9. Live endpoint testing screenshots
10. GitHub repository link, Render link, and Vercel link

## Sample Endpoint Tests

- `POST /api/register`
- `POST /api/login`
- `GET /api/dashboard` with Bearer token
- `POST /api/items` with Bearer token
- `GET /api/items`
- `GET /api/items/:id`
- `PUT /api/items/:id` with Bearer token
- `DELETE /api/items/:id` with Bearer token
- `GET /api/items/search?name=wallet`

## Thunder Client Testing

You do not need Postman for this project. Use the included [THUNDER_CLIENT_GUIDE.md](/Users/gavendrapachahra/Desktop/AI_FSD_MSE2/THUNDER_CLIENT_GUIDE.md) to test every required API in Thunder Client inside VS Code.

If needed, the project also includes [postman_collection.json](/Users/gavendrapachahra/Desktop/AI_FSD_MSE2/postman_collection.json), but Thunder Client testing is fully supported using the guide.
