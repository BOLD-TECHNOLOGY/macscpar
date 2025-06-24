**MACSCPAR** project (Multi-Agency Collaboration System on Crime Prediction and Reporting) combining **Laravel API** and **React Frontend**

* Project overview
* Architecture
* Installation (Backend and Frontend)
* Environment variables
* Scripts
* Features
* Contribution guidelines

---

```markdown
# MACSCPAR - Multi-Agency Collaboration System on Crime Prediction and Reporting

**MACSCPAR** is a full-stack web application designed to foster collaboration between police and non-police agencies in crime reporting, prediction, and early prevention. Built with a **Laravel API backend** and a **React frontend**, the system offers a secure and scalable platform to streamline inter-agency workflows, improve crime tracking, and empower communities through transparent and real-time information exchange.

---

## 🔧 Tech Stack

### Backend (Laravel API)
- Laravel 12.x
- Sanctum (for API authentication)
- MySQL / SQLite
- Laravel Resource Controllers & Middleware
- Role-based Access Control (RBAC)

### Frontend (React)
- React 18+
- Axios (API communication)
- React Router DOM
- Tailwind CSS
- JWT token handling with Secure LocalStorage

---

## 📁 Project Structure

```

macscpar/
├── backend/             # Laravel API
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── ...
├── frontend/            # React Client
│   ├── src/
│   ├── public/
│   └── ...
└── README.md

````

---

## 🚀 Features

- 🔐 **User Authentication** (register, login, password reset)
- 🧑‍🤝‍🧑 **Role-based access** for Police, NGO, Civil Society, etc.
- 📄 **Case Reporting** with document support
- 🗃️ **Multi-agency Collaboration** dashboard
- 📍 **Geo-tagging & Location-based reports**
- 🧠 **Crime Prediction Engine** (via planned ML modules)
- 📊 **Data Visualization & Analytics**
- 🌐 **API-first Architecture** for scalability and integrations

---

## 🛠️ Installation

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer
- MySQL or SQLite

### Backend (Laravel API)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
````

> Make sure to set your DB credentials in `.env`.

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Environment Configuration

### Laravel `.env` highlights

```env
APP_NAME=MACSCPAR
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=macscpar_db
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### React `.env` (optional for API base URL)

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 📡 API Structure

* `POST /api/register` - Register user
* `POST /api/login` - Login user
* `GET /api/user` - Authenticated user info
* `POST /api/reports` - Submit crime report
* `GET /api/reports` - List reports (filtered by role)

Refer to the `/docs` folder or Postman collection (if provided) for complete endpoints.

---

## 🧪 Testing

### Laravel

```bash
php artisan test
```

### React

```bash
npm test
```

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit your changes (`git commit -m 'Add something'`)
4. Push to the branch (`git push origin feature/awesome`)
5. Open a Pull Request

---

## 📄 License

MACSCPAR is developed and maintained by **TSUAD LLC**. It is open for extension under proprietary terms. Contact [info@tsuad.com](mailto:info@tsuad.com) for collaboration, partnerships, or deployment.

---

## 📬 Contact & Support

For questions, issues, or feature requests:

* Email: [info@tsuad.com](mailto:ndungurujosephat30@gmail.com)
* Website: [www.tsuad.com](https://vmosesr.github.io/tsuad-hubs/)

---

```

Would you like me to split this into separate `README.md` files for both `/backend` and `/frontend` folders as well?
```
