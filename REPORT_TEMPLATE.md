# MSE2 Project Report Template

## Project Title

Lost & Found Item Management System using MERN Stack

## Student Details

- Name:
- Roll Number:
- Subject: AI Driven Full Stack Development (AI308B)
- Examination: MSE2 Part D

## Problem Statement

Students in a college campus often lose and find personal belongings. This project provides a web-based Lost & Found Item Management System to manage such reports efficiently.

## Objectives

- Provide secure student registration and login
- Allow reporting of lost items with details
- Allow reporting of found items and location
- View and search all reported items
- Update or delete only own reports
- Logout securely

## MongoDB Schemas

### User Schema

- Name
- Email (Unique)
- Password (Hashed)

### Item Schema

- Item Name
- Description
- Type
- Category
- Location
- Date
- Contact Info

Add code screenshots from:

- `backend/src/models/User.js`
- `backend/src/models/Item.js`

## Backend Implementation

Add code screenshots for:

- `POST /api/register`
- `POST /api/login`
- `POST /api/items`
- `GET /api/items`
- `GET /api/items/:id`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`
- `GET /api/items/search`
- Authentication middleware

## Frontend Implementation

Add screenshots for:

- Registration page
- Login page
- Dashboard
- Add item form
- Search section
- Update/Delete actions
- Logout flow

## API Testing Screenshots

Add Thunder Client screenshots for:

- Register request
- Login request
- Add item request
- Get all items request
- Get item by ID request
- Update item request
- Delete item request
- Search item request
- Unauthorized access example

Use the request details from:

- `THUNDER_CLIENT_GUIDE.md`

## MongoDB Screenshots

Add screenshots of:

- `users` collection
- `items` collection

## Deployment

### GitHub Repository Link

- Add your GitHub repository URL here

### Render Links

- Backend URL:
- Frontend URL:

### Vercel Link

- Frontend URL:

## Render Testing Live URLs

- `GET /`
- `POST /api/register`
- `POST /api/login`
- `GET /api/dashboard`
- `GET /api/items`
- `GET /api/items/search?name=...`

## Output Screenshots

Add screenshots showing:

- Successful registration
- Successful login
- Dashboard loaded
- Item added
- Item updated
- Item deleted
- Search results
- Render successful deployment

## Conclusion

Write a short conclusion about how MERN stack, JWT authentication, MongoDB, and deployment tools were used to complete the system.
