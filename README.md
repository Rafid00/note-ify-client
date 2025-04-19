# Note-ify (Client Side)

Note-ify is a simple note-taking application built with React.js on the frontend and Express.js on the backend. This is the client-side application that provides a minimal and intuitive UI to manage your notes securely.

---

## 🚀 Features

- Authentication (Login/Signup)
- Create, Read, Update, Delete notes
- Token-based authorization
- Responsive & vintage-styled design (Windows 97 inspired)

---

## 🛠️ Tech Stack

- React.js
- Context API
- Axios
- React Router
- Tailwind CSS

---

## 📦 Installation

### Prerequisites:

- Node.js installed
- Backend server (Note-ify API) running on `http://localhost:5001`

### Steps:

1. **Clone the repository**
```bash
git clone <your-client-repo-url>
cd note-ify-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Visit**
```
http://localhost:3000
```

---

## 📁 Folder Structure

```
note-ify-client/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── App.js
│   └── index.js
└── README.md
```

---

## 📌 Notes

- Make sure to add the backend server URL in the axios requests.
- AuthContext uses `localStorage` for persisting session tokens.

---

## 📄 License

MIT

---

# Note-ify (Server Side)

This is the server-side application of **Note-ify**, a secure and minimal note-taking app built with Node.js and Express.js.

---

## 🚀 Features

- User registration & login
- Token-based authentication (JWT)
- Create, Read, Update, Delete notes
- RESTful API

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js

---

## 📦 Installation

### Prerequisites:

- MongoDB instance (local or MongoDB Atlas)

### Steps:

1. **Clone the repository**
```bash
git clone <your-server-repo-url>
cd note-ify-server
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root:
```env
PORT=5001
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
```

4. **Run the server**
```bash
npm start
```

5. **Server will run on**
```
http://localhost:5001
```

---

## 📁 Folder Structure

```
note-ify-server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── server.js
└── README.md
```

---

## 📌 Notes

- Make sure your MongoDB URI and JWT secret are correct in `.env`
- CORS is enabled for `http://localhost:3000`

---

## 📄 License

MIT