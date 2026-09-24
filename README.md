# Leads Tracking App

A full-stack leads tracking application built as a coding assignment. It allows users to track leads, manage contact information, update statuses, and maintain chronological notes.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite (using Prisma ORM)

*Note: This project uses a local SQLite database (`dev.db`), so there is no need to install or configure PostgreSQL or any external database.*

## How to Run

This project is set up as a monorepo workspace. You can manage everything directly from the root folder.

### 1. Initial Setup
To install all dependencies, generate the database schema, and seed it with sample data, run:
```bash
npm run setup
```

### 2. Start the Application
To start both the backend API and the frontend UI concurrently, run:
```bash
npm run dev
```

- **Frontend URL:** `http://localhost:3000`
- **Backend API URL:** `http://localhost:5050/api`

## Features

- **Leads:** Create, read, update, and delete leads.
- **Notes:** Add timestamped notes to any lead.
- **Search & Filter:** Filter leads by `status` or search by name/email.
- **Data Validation:** Inputs are safely validated on the backend.

## API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads` | Get all leads (supports `?search=` and `?status=`) |
| `POST` | `/api/leads` | Create a new lead |
| `GET` | `/api/leads/:id` | Get lead details and their notes |
| `PATCH` | `/api/leads/:id` | Update lead status or info |
| `DELETE` | `/api/leads/:id` | Delete a lead (cascades notes) |
| `GET` | `/api/leads/:id/notes` | Get notes for a lead |
| `POST` | `/api/leads/:id/notes`| Add a new note to a lead |
