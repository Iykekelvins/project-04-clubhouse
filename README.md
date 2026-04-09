# ✦ The Odin Clubhouse

A members-only message board built with Node.js, Express, EJS, and PostgreSQL. Users can sign up, post messages, and unlock author details through premium membership.

---

## Features

- User authentication (sign up / log in / log out)
- Members-only message board
- Post messages with a title and content
- Premium membership tier — only premium members can see a message's author and date posted
- Admin status support
- Protected routes — only logged-in users can create messages

---

## Tech Stack

- **Backend:** Node.js, Express
- **Templating:** EJS
- **Database:** PostgreSQL
- **Styling:** Custom CSS (Clubhouse dark theme — Playfair Display + DM Sans)

---

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

```bash
git clone https://github.com/Iykekelvins/project-04-clubhouse.git
cd project-04-clubhouse
npm install
```

### Database Setup

Create a PostgreSQL database and run the following to set up your tables:

```sql
CREATE TABLE users (
    id                SERIAL PRIMARY KEY,
    first_name        VARCHAR(100) NOT NULL,
    last_name         VARCHAR(100) NOT NULL,
    username          VARCHAR(50)  NOT NULL UNIQUE,
    password_hash     VARCHAR(255) NOT NULL,
    membership_status VARCHAR(20)  NOT NULL DEFAULT 'basic',
    is_admin          BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id         SERIAL PRIMARY KEY,
    title      VARCHAR(255) NOT NULL,
    content    TEXT         NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id    INT          NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
```

### Environment Variables

Create a `.env` file in the root of your project:

```env
USER
DATABASE
PASSWORD
DB_PORT
SESSION_SECRET
SECRET_HERO
```

### Run the App

```bash
nodemon app
```

Visit `http://localhost:8000`.

---

## Project Structure

```
the-odin-clubhouse/
├── public/
│       └── styles.css
├── views/
│   ├── index.ejs
│   ├── sign-up.ejs
│   ├── login.ejs
│   └── new-message.ejs
│   └── admin.ejs
│   └── update-user.ejs
├── middleware/
│   └── auth.middleware.js
├── app.js
├── db
└── README.md
```

---

## Membership Tiers

| Feature            | Basic | Premium |
| ------------------ | ----- | ------- |
| View messages      | ✓     | ✓       |
| Post messages      | ✓     | ✓       |
| See message author | ✗     | ✓       |
| See date posted    | ✗     | ✓       |

---
