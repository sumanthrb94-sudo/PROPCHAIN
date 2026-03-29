# PropChain – Premium Fractional Real Estate Tokenization

PropChain is a state-of-the-art blockchain platform designed to democratize high-end real estate investment. Invest in Dubai's most prestigious properties starting from just **AED 500**.

![PropChain Banner](https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2000)

## 🏢 Platform Overview

PropChain combines the security of blockchain technology with the stability of the UAE real estate market. Our platform allows users to own fractions of premium assets, earn automated rental dividends, and benefit from property appreciation.

### Key Features
- **Fractional Ownership**: Own high-yield assets with minimal capital.
- **Blockchain Powered**: Transparent, secure transactions via smart contracts.
- **VARA Compliant**: Operating within the UAE's Virtual Assets Regulatory Authority framework.
- **Instant Liquidity**: Exit your positions through our internal secondary market.
- **High Yields**: Target 8-12% annual rental yields on premium Dubai properties.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS / Vanilla CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT & Passport
- **Containerization**: Docker & Docker Compose

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (if running locally without Docker)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sumanthrb94-sudo/PROPCHAIN.git propchain
   cd propchain
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Environment Setup**:
   Copy `.env.local` for the frontend and `.env` for the backend, then fill in your credentials.

5. **Spin up Services**:
   ```bash
   docker-compose up -d
   ```

6. **Run the Application**:
   - Frontend: `npm run dev`
   - Backend: `cd backend && npm run start:dev`

---

## 🔒 Security & Compliance

PropChain is built with security at its core. Our smart contracts are audited, and our platform adheres to the highest standards of UAE financial regulations.

---

## 📄 License

PropChain is proprietary software. All rights reserved.

---

Developed for **sumanthrb94-sudo/PROPCHAIN**.
