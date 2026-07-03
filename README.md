# Applicant Tracking Dashboard

A recruitment management system built with **Next.js**, **Refine**, **Strapi**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Refine
* TanStack Query
* Zustand
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod
* Axios

### Backend

* Strapi v4
* PostgreSQL

---

# Prerequisites

Before running the project, ensure you have the following installed:

* Node.js 20 or later
* npm
* Git

---

# Getting Started

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_STRAPI_URL=https://your-test-api.example.com
NEXT_PUBLIC_STRAPI_TOKEN=your-strapi-api-token
```

### Required Environment Variables

| Variable                   | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_STRAPI_URL`   | Base URL of the shared Strapi Test Environment API.            |
| `NEXT_PUBLIC_STRAPI_TOKEN` | Strapi API token used to authenticate requests to the backend. |

> **Note:** Restart the development server after creating or updating the `.env.local` file.

---

## 4. Start the Development Server

```bash
npm run dev
```

Open the application at:

```
http://localhost:3000
```

---

# Backend Setup

This project connects to a **shared Strapi Test Environment**.

A local Strapi installation is **not required**.

Configure the following environment variables:

```env
NEXT_PUBLIC_STRAPI_URL=https://your-test-api.example.com
NEXT_PUBLIC_STRAPI_TOKEN=your-strapi-api-token
```

Once configured, the frontend will automatically connect to the shared backend.

---

# State Management

The application uses **Zustand** for lightweight global state management.

### Current Usage

Zustand is currently used to manage the application's **mock login state**, allowing developers to quickly switch between authenticated and unauthenticated views without integrating a real authentication provider.

This functionality is intended for development, testing, and demonstration purposes.

---

# Available Scripts

### Start the development server

```bash
npm run dev
```

### Build the application

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

---

# Project Structure

```
src/
├── app/
├── components/
├── constants/
├── hooks/
├── lib/
├── providers/
├── stores/
├── types/
└── utils/
```

---

# Troubleshooting

## Environment variables are undefined

* Ensure `.env.local` exists in the project root.
* Verify all required environment variables are configured.
* Restart the development server after making changes.

## Unable to connect to the API

* Verify the Strapi Test Environment is running.
* Confirm `NEXT_PUBLIC_STRAPI_URL` is correct.
* Ensure `NEXT_PUBLIC_STRAPI_TOKEN` is valid and has the required API permissions.

---

# License

This project is intended for internal use.
