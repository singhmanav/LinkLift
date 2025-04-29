# LinkLift - Smart, Scalable Deep Linking Platform

LinkLift is a scalable deep linking service built with **FastAPI** (Python backend), **React** (frontend), and **PostgreSQL**.  
It allows dynamic link generation with redirection behavior based on whether the target app is installed, fallback to web views, and even App Store redirects. All of this is fully configurable via a custom admin dashboard.

---

## 🚀 Features

- 🔗 Create short, smart links that redirect dynamically
- 📱 Redirect to app if installed, App Store if not
- 🌐 Webview fallback option via dashboard
- 📊 Click tracking (extensible)
- 🧩 Modular, containerized architecture (backend, frontend, DB)
- ⚡ Built with FastAPI + React + PostgreSQL
- 🐳 Podman (or Docker) support
- 🌱 Easily extensible for auth, analytics, and mobile SDKs

---

## 📁 Project Structure

```
LinkLift/
├── backend/               # FastAPI backend
│   ├── app/               # Main app logic
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── auth.py
│   └── requirements.txt
│
├── frontend/              # React frontend (Vite)
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── pages/
│   └── package.json
│
├── db/
│   └── init.sql           # Adds default admin user to DB
│
├── docker-compose.yml     # Service definitions
└── README.md              # This file
```

---

## 🛠️ Setup Instructions

### Prerequisites

- [Podman](https://podman.io/) or Docker
- Node.js (v18+) and Python (3.10+) for local development (optional)

---

### 🐳 Quickstart (with Podman)

```bash
# Clean and start fresh
podman-compose down -v
podman-compose build
podman-compose up
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)
- Database: PostgreSQL on `localhost:5432`

---

### 🧪 Default Credentials

- **Username**: `admin`  
- **Password**: `admin123`  
> These are loaded via `db/init.sql`. You can change them there.

---

## ✨ Customization

- 🔐 Add JWT-based auth in `backend/app/auth.py`
- 💻 Customize frontend in `frontend/src/pages/`
- 🌐 Customize deep link redirection logic in `backend/app/main.py`
- 📦 Add analytics or webhooks for click tracking

---

## 📈 Scaling Tips

- Add Redis for shortlink cache
- Use Celery + RabbitMQ for async tracking/events
- Add Nginx/Gunicorn for production backend
- Host frontend via CDN for speed

---

## 📄 License

MIT – feel free to fork, use, and contribute.

---

## 🤝 Contributions

Pull requests welcome. For major changes, please open an issue first to discuss.

