# TaskHandler Frontend

This is the **frontend application** for the TaskHandler project.  
It is built with **React + TypeScript + Vite** and communicates with the [TaskHandler Backend](https://github.com/ClaireV38/Task-handler-backend) (Laravel API).

---

## 🚀 Features
- Login with email & password (via backend API)
- Protected dashboard (only accessible for authenticated users)
- Simple state management with hooks (`useAuth`)

---

## 🛠 Requirements
- Node.js `>=20.19.0` (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- npm `>=10`

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ClaireV38/Task-handler-frontend.git
cd taskhandler-frontend
npm install
```

## ▶️ Running locally

Start the development server:
```bash
npm run dev
npm install
```
By default, the app runs on http://localhost:5173
.

⚠️ Make sure the backend
 is also running locally (Laravel in Docker on http://taskhandler.local:8000)


---

## 🔑 Authentication flow

User logs in with email/password

Backend issues a Sanctum token

Token is stored in localStorage

Protected routes (like the Dashboard) require the token to be present and valid

---

## 📂 Project structure

src/
├─ components/ # Reusable UI components
├─ hooks/ # Custom React hooks (e.g. useAuth)
├─ pages/ # Pages (Login, Dashboard, etc.)
├─ services/ # API calls to backend
└─ main.tsx # App entry point

## 🧪 Testing login with Postman

You can also test the backend API manually with Postman:

- `POST http://taskhandler.local/api/login` → returns a token  
- `GET http://taskhandler.local/api/me` with `Authorization: Bearer <token>` → returns current user  

---

## 📌 Notes

- The frontend will not work without the backend running.  
- Update the API base URL in `src/services/api.ts` if your backend is not on `http://taskhandler.local:8000`.  

