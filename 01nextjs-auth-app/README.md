# Authentication System 🔐

A full-stack authentication system built with **Next.js, MongoDB, JWT, and Nodemailer**.  
This project demonstrates user login, registration, email verification, password reset, and profile management.

🌐 **Live Demo**: [Authentication System](https://authentication-system-git-main-mohd-sayams-projects.vercel.app)

---

## ✨ Features

- User registration and login
- JWT-based authentication with HttpOnly cookies
- Protected routes using Next.js middleware
- Email verification (via Mailtrap for development)
- Password reset (via Mailtrap for development)
- User profile page with logout option
- Styled with **Tailwind CSS**
- Toast notifications for feedback

---

## 🚨 Important Note

This project uses **Mailtrap** for email verification and password reset.  
Since Mailtrap is only for testing, **you cannot verify your email or reset your password directly on the live demo**.  

If you want to use those features:
1. Clone this repo.
2. Add your own **SMTP credentials** in the `.env.local` file.
3. Run the project locally or redeploy it with your email settings.

---

## 👥 Demo Accounts

To test the live demo without needing email verification, you can log in using these accounts (already registered in the database):

- **Email:** `one@gmail.com`  
  **Password:** `123456`

- **Email:** `two@gmail.com`  
  **Password:** `123456`

---

## 📦 Tech Stack

- **Frontend & Backend:** Next.js 15
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + HttpOnly cookies
- **Email Service:** Nodemailer (Mailtrap for dev)
- **Styling:** Tailwind CSS
- **UI Feedback:** react-hot-toast

---

## ⚙️ Getting Started (Local Setup)

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/authentication-system.git
   cd authentication-system

# Install all dependencies first if you want to run locally by npm install

## **These are commands to run locally **
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## These are the env variables if you want to run locally just change them accordingly

```bash
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
MAIL_HOST=smtp.yourmail.com
MAIL_PORT=587
MAIL_USER=your_email_username
MAIL_PASS=your_email_password```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
