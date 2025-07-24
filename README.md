# DevStack

DevStack is a full-stack blogging platform built with the MERN stack (MongoDB, Express, React, Node.js). It features user authentication (including Google OAuth), blog creation and editing, comments, likes, bookmarks, and a modern responsive UI with Tailwind CSS.

## Features
- User authentication (email/password & Google Sign-In)
- Create, edit, and delete blogs
- Like and bookmark blogs
- Comment on blogs
- Search and filter blogs by tags
- Responsive design
- Toast notifications

## Tech Stack
- **Frontend:** React, Redux, Tailwind CSS, React Router, React Toastify, React Quill, Google OAuth
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Google Auth Library

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB Atlas or local MongoDB

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/shishpal0666/DevStack.git
   cd DevStack
   ```
2. **Install dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both `client` and `server` folders and fill in the required values (MongoDB URI, JWT secret, Google OAuth credentials, etc).

4. **Run the development servers:**
   - In one terminal:
     ```bash
     cd server
     npm start
     ```
   - In another terminal:
     ```bash
     cd client
     npm start
     ```
   - The client runs on [http://localhost:3000](http://localhost:3000) and the server on [http://localhost:5000](http://localhost:5000) by default.

## Folder Structure
```
DevStack/
├── client/         # React frontend
├── server/         # Node.js/Express backend
├── README.md
├── LICENSE
└── ...
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author
- [shishpal0666](https://github.com/shishpal0666)

