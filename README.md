# StudyNook – Library Study Room Booking

🔗 **Live Site**: [https://studynook.vercel.app](https://studynook.vercel.app)

StudyNook is a full-stack web application where students and library users can browse, search, filter, and book study rooms for specific dates and time slots.

---

## ✨ Key Features

- **Smart Booking System** – Book study rooms with real-time cost calculation, automatic time-conflict detection prevents double-booking using MongoDB's `$gte` and `$lte` operators.
- **Secure JWT Authentication** – User sessions managed via HTTP-only cookies with JWT tokens. Supports email/password and Google OAuth sign-in for seamless access.
- **Advanced Search & Filtering** – Search rooms by name with instant results, filter by amenities (Whiteboard, Projector, Wi-Fi, etc.) using MongoDB `$regex` and `$in` operators.
- **Room Management Dashboard** – Authenticated users can create, edit, and delete their own study room listings with ownership verification on every request.
- **Premium Responsive Design** – Glassmorphism UI with dark/light theme toggle, Framer Motion animations, and fully responsive layout for mobile, tablet, and desktop.

---

## 🛠️ Technologies Used

| Layer | Stack |
|-------|-------|
| Frontend | React 18, Vite, React Router v6, Framer Motion, Axios |
| Backend | Node.js, Express.js, MongoDB (Mongoose) |
| Auth | JWT (HTTP-only cookies), Firebase (Google OAuth) |
| Styling | Vanilla CSS with CSS custom properties |
| Deployment | Vercel (client), Render (server) |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/studynook-client.git

# Install dependencies
cd studynook-client
npm install

# Set up environment variables
cp .env.example .env

# Run the development server
npm run dev
```

---

## 📁 Project Structure

```
src/
├── components/   # Reusable UI components (Navbar, Footer, RoomCard, etc.)
├── contexts/     # React Contexts (Auth, Theme)
├── hooks/        # Custom hooks (Axios instance)
├── layouts/      # Page layouts (MainLayout)
├── pages/        # Route pages (Home, Rooms, Login, etc.)
└── services/     # API service functions
```
