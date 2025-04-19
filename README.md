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