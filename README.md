# SimulAuto - Auto-Entrepreneur Simulator

SimulAuto is a simple and efficient web application that allows auto-entrepreneurs to quickly calculate their social charges, taxes, and net income based on their turnover and type of activity.  
The project includes a React frontend and a Node.js backend for sending messages via a contact form.

---

## Features

- Automatic calculation of social charges, taxes, CMA contribution, professional training, CFE, and net income.
- Management of different activity types (service provision and sales of goods).
- Alerts in case of exceeding VAT thresholds and turnover ceilings.
- Simple contact form that sends messages directly via email through the backend.
- Results visualization with charts (pie chart).
- Responsive design suitable for all screen sizes.

---

## Tech Stack

- Frontend: React (hooks, functional components), Tailwind CSS, Recharts
- Backend: Node.js, Express, Nodemailer
- Deployment: Frontend on Hostinger, Backend on Render (or any other PaaS)

---

## Local Setup

### Frontend

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/simulauto.git
   cd simulauto/frontend
    npm install
   ```
Start the development server

```bash
npm start
```
Access the app at http://localhost:5173

Backend
Go to the backend folder

```bash
cd ../backend
```
Install dependencies

```bash
npm install
```
Create a .env file at the root with the following environment variables:
```ini
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password-or-app-token
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
```
Start the backend server

```bash
node server.js
```
The backend server listens on port 5000 by default (can be changed).

Deployment
Backend
Deploy on Render, Railway, Vercel (Node.js serverless), or any other PaaS.

Configure Nodemailer environment variables on the platform.

Update the backend URL in the frontend to point to the deployed backend URL.

Frontend
Deploy on Hostinger or any static hosting service.

Configure domain and DNS settings.

Ensure the contact form points to the production backend URL.

Usage
Enter your turnover and select your type of activity.

Check or uncheck the tax payment options (liberatory tax and CFE) as needed.

Click “Calculate” to see the breakdown of charges and net income.

Use the contact form to send messages directly to the site owner.

Contact
For any questions, use the built-in contact form or contact directly via the email in the legal notice.

License
This project is not-free to use right now, just here to be seen.
