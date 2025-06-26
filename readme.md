# QuickTask Backend (Express + MongoDB)

This is the backend for the QuickTask project — a role-based task management system built with Node.js, Express, and MongoDB.

## Technologies
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt (password hashing)


## .env Configuration

Create a `.env` file in the root:

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## 📦 Setup & Run

```bash
npm install
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/users` (admin only)

### Tasks
- `POST /api/tasks` (admin)
- `GET /api/tasks` (admin: all tasks, member: own tasks)
- `PUT /api/tasks/:id` (admin/member)
- `DELETE /api/tasks/:id` (admin)

## Test with Postman

Use a bearer token (returned on login) in the Authorization header.

```
Authorization: Bearer <token>
```

## Roles & Access

- `admin`: can create, assign, and delete tasks
- `member`: can only view and update their own tasks

## 📌 Notes

- Passwords are hashed before storing
- JWT is used for authentication
- Basic RBAC (Role-Based Access Control) is enforced
