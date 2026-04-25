# Prept - AI Interview Marketplace 🚀

<div align="center">

</div>

<br />

Prept is a comprehensive, full-stack AI-driven interview preparation marketplace. It bridges the gap between candidates seeking interview practice and industry experts looking to provide mentorship. Featuring live video sessions, real-time chat, and AI-powered feedback analysis using Google Gemini, Prept offers a seamless and structured way to prepare for technical and behavioral interviews.

---

## ✨ Key Features

- **Dual Roles (Interviewee & Interviewer)**: Users can sign up as either an interviewer (setting availability, rates, and domains) or an interviewee (purchasing credits and booking sessions).
- **Live Video & Chat Integration**: High-quality, reliable video calls and messaging powered by Stream.
- **AI Session Feedback**: Automated, structured feedback generation using Google Gemini AI, analyzing technical skills, communication, and problem-solving abilities.
- **Credit & Payout System**: Built-in virtual economy where interviewees purchase credits to book sessions, and interviewers earn credits that can be cashed out.
- **Robust Scheduling**: Calendar integration and availability management to avoid double-booking.
- **Advanced Security**: Integrated bot protection and rate limiting using Arcjet.
- **Email Notifications**: Automated email alerts for bookings, cancellations, and feedback using Resend.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Hosted on Supabase/Neon)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Video & Real-time Chat**: [Stream SDK](https://getstream.io/)
- **AI Engine**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Security**: [Arcjet](https://arcjet.com/)
- **Emails**: [Resend](https://resend.com/) & [React Email](https://react.email/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A PostgreSQL Database (e.g., [Supabase](https://supabase.com/))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add the following keys. You will need to create accounts for the respective services to get these API keys.

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# Database (PostgreSQL via Supabase/Neon)
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"

# Stream (Video Calling & Chat)
NEXT_PUBLIC_STREAM_API_KEY="your_stream_api_key"
STREAM_SECRET_KEY="your_stream_secret_key"

# Google Gemini (AI Feedback Generation)
GEMINI_API_KEY="your_gemini_api_key"

# Resend (Email Notifications)
RESEND_API_KEY="your_resend_api_key"

# Arcjet (Bot Protection / Security)
ARCJET_KEY="your_arcjet_key"

# App URL & Admin
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ADMIN_PAYOUT_PASSWORD="your_custom_admin_password"
```

### 4. Database Setup

Generate the Prisma client and push the schema to your database to create the necessary tables:

```bash
npx prisma generate
npx prisma db push
```

*(Optional)* Seed the database with initial dummy data:
```bash
node prisma/seed.js
```

### 5. Run the Application

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

---

## 📁 Project Structure

```text
├── actions/         # Server actions for database operations and business logic
├── app/             # Next.js App Router pages and API routes
├── components/      # Reusable React components (UI and functional)
├── emails/          # React Email templates for notifications
├── hooks/           # Custom React hooks
├── lib/             # Utility functions, Prisma client setup, and configurations
├── prisma/          # Prisma schema and database seed script
└── public/          # Static assets (images, icons)
```

---

## 👨‍💻 Author

Made with ❤️ by Mijanur

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
