# MMM Medical Store

<div align="center">

![Repo](https://img.shields.io/badge/Monorepo-Frontend%20%2B%20Backend-0f172a?style=for-the-badge&logo=github&logoColor=ffffff)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-0ea5e9?style=for-the-badge&logo=react&logoColor=ffffff)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-14b8a6?style=for-the-badge&logo=node.js&logoColor=ffffff)
![Database](https://img.shields.io/badge/Database-MongoDB-16a34a?style=for-the-badge&logo=mongodb&logoColor=ffffff)
![Payments](https://img.shields.io/badge/Payments-Razorpay-111827?style=for-the-badge&logo=razorpay&logoColor=ffffff)

</div>

Modern full-stack medical store and pharmacy e-commerce monorepo built for product browsing, prescription uploads, cart flow, and online payments.

## Highlights

- React + Vite frontend for a fast, responsive shopping experience
- Node.js + Express backend for APIs and business logic
- MongoDB models for products, categories, and orders
- Prescription upload and contact workflows
- Razorpay integration for checkout
- GitHub Actions deployment for the frontend app

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose, Multer, Cloudinary, Firebase Admin, Redis, Razorpay
- Tooling: GitHub Actions, EmailJS

## Repository Layout

```text
mmm-medical-shop/
├── backend/
└── frontend/
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Frontend EmailJS values are configured in `frontend/.env`.

Backend secrets are configured in `backend/.env`.

## Deployment

The frontend is deployed with GitHub Actions from the repository root. The workflow builds `frontend/` and publishes `frontend/dist` to GitHub Pages.

## Frontend Notes

The detailed frontend documentation now lives in [frontend/FRONTEND_README.md](frontend/FRONTEND_README.md).

## License

Proprietary project. All rights reserved unless a separate license is added later.
