# Notely - Your Note Management App

## Introduction

Notely is a web application designed to help users manage and organize their notes efficiently. It provides user authentication, note creation, updating, deleting, sharing and searching functionalities. Users can also share notes with others and search for notes based on keywords.

## Tech Stack

- **Frontend:**

  - React.js
  - Tailwind CSS
  - Axios

- **Backend:**
  - Node.js (Express.js)
  - MongoDB (Mongoose for ODM)
  - JWT for authentication

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB server running locally or accessible remotely

### Installation

1. Fork the repository:
2. Clone the repository:

```bash
git clone https://github.com/your-username/notely.git
cd notely

# Install backend dependencies
cd backend
npm install

cd ..
# Install frontend dependencies
cd client
npm install
```

3. Configure environment variables:

- Create a .env file in the backend directory and set the following variables:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=port
```

4. Run the application:

```bash
cd backend
npm run dev


cd client
npm run dev
```

### API Endpoints:

1. Authentication

- Sign Up: POST /api/auth/signup
- Login: POST /api/auth/login

2. Notes

- Get All Notes: GET /api/notes
- Get a Note by ID: GET /api/notes/:id
- Create a New Note: POST /api/notes
- Update a Note by ID: PUT /api/notes/:id
- Delete a Note by ID: DELETE /api/notes/:id
- Share a Note with Another User: POST /api/notes/:id/share
- Search for Notes Based on Keywords: GET /api/search?q=:query

### Testing:

to test all api by running frontend or simply use Postman

### Backend folder structure

```
backend/
|-- controller/
|   |-- authController(auth.js)
|   |-- noteController(note.js)
|
|-- middleware/
|   |-- authMiddleware(auth.js)
|
|-- model/
|   |-- userModel(user.js)
|   |-- noteModel(note.js)
|
|-- routes/
|   |-- authRoutes(auth.js)
|   |-- noteRoutes(note.js)
|
|-- .env
|-- .gitignore
|-- dbConnect.js
|-- index.js
|-- package.json
```
