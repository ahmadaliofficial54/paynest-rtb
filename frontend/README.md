# 🔨 Live Auction Platform

A full-stack real-time auction platform built with **React**, **NestJS**, and **Prisma**. Users can create auction items, place bids in real-time, and watch auctions close automatically based on timers.

---

## 🧱 Tech Stack

| Frontend     | Backend | Database   | Realtime  | Styling     | Tooling                       |
| ------------ | ------- | ---------- | --------- | ----------- | ----------------------------- |
| React + Vite | NestJS  | PostgreSQL | Socket.io | Vanilla CSS | Prisma, React Query, Toastify |

---

## 🚀 Features

- ✅ Create and list auction items with timed expiration
- ✅ Real-time bidding updates using WebSocket
- ✅ Automated auction closing via cron jobs
- ✅ Input validation with feedback (via toast notifications)
- ✅ Fully responsive and professional UI

---

## 📦 Folder Structure

```
project-root/
├── backend/
│ ├── src/
│ │ ├── prisma/ # Prisma service and module
│ │ ├── items/ # Item module, controller, service
│ │ ├── bids/ # Bid module, controller, service
│ │ ├── auction/ # WebSocket gateway and scheduler
│ ├── prisma/schema.prisma # DB schema
│ ├── main.ts # App entry point
│
├── frontend/
│ ├── src/
│ │ ├── pages/ # Dashboard & Auction detail pages
│ │ ├── lib/ # API utilities & WebSocket config
│ ├── main.tsx # React entry point
│ ├── App.tsx # Routing

---
```

## 🛠 Setup Instructions

### 1. Clone & Install

## cd backend

```bash
 cp .env.example

 .env # Add your DATABASE_URL here

DATABASE_URL="postgresql://user:password@localhost:5432/auctiondb"

```

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init

npm run start:dev
```

## cd ../frontend

```bash
npm install
npm run dev

```
