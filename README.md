Doorclinik

Doorclinik is a full-stack doctor appointment platform designed to simplify appointment booking for patients and clinic management for doctors. It provides features for doctor listings, booking appointments, real-time notifications, secure payments, and review management, all presented in a modern, user-friendly interface.

Project Contributors - Akashdeep Kumar
Features
Patient Features

🔍 Browse and search doctors by specialization or location

📆 Check availability and book appointments

💬 Receive notifications for confirmed appointments

📄 View appointment history and past reviews

⭐ Leave reviews for doctors

Doctor Features

🏥 Add, edit, and manage clinic listings

📸 Upload and store doctor profile images using Cloudinary

💬 Communicate with patients via notifications

📈 Track appointments and earnings

⭐ View reviews left by patients

Admin Features

🧑‍💼 Manage all users (doctors & patients)

📦 Monitor doctor listings

💬 Review user interactions

⛔ Block or unblock user accounts

📊 Access platform-wide metrics

Project Highlights

🔐 Authentication: Role-based login for Admin, Doctor, and Patient using Passport.js with session management.

💬 Real-time Notifications: Appointment notifications for doctors powered by Socket.IO.

🖼️ Cloudinary Integration: Store doctor profile images and clinic images securely, URLs saved in MongoDB.

💬 MVC Structure: Implements the Model-View-Controller (MVC) pattern with models for data, views for EJS templates, and controllers/routes for application logic.

💬 Mapbox Integration: Uses Mapbox API to display clinic locations interactively on maps with markers for better UX.

💳 Razorpay Integration: Enables patients to pay for appointments online; payment status updates the booking status automatically.

📅 Booking Flow: Full appointment booking system with date validation, slot availability checks, and conflict prevention.

⭐ Reviews & Ratings: Patients can leave reviews for doctors, displayed dynamically.

📁 Database: MongoDB backend using Mongoose with normalized schemas for users, doctors, bookings, and reviews.

🛡️ Security: Helmet.js Content Security Policy and session-based authentication with MongoStore.

Tech Stack
🔹 Frontend

EJS Templates

Bootstrap 5

Vanilla JS for client-side interactions

Socket.IO client for real-time notifications

CSS Grid & Flexbox for layouts

Mapbox for interactive clinic maps

🔹 Backend

Node.js
Express.js
MongoDB with Mongoose
Passport.js for authentication
Connect-Mongo for session storage
Socket.IO for real-time communication
Cloudinary SDK for image uploads
Express-Session & Flash for sessions and notifications
Helmet.js for security
Razorpay for payment processing

Workflow:

User Authentication: Patients, Doctors, and Admins can register and log in with role-based access.

Clinic Management: Doctors can add or edit clinics, upload images, and manage appointment slots.

Booking Process: Patients select slots, system checks availability, and confirms appointment after payment.

Real-time Notifications: Doctors receive live notifications of new bookings.

Reviews & Ratings: Patients can leave reviews after an appointment, visible to all users.

Admin Controls: Admin can manage users, block/unblock accounts, and monitor platform activity.

Setup Instructions
📁 Clone the Repository
git clone https://github.com/yourusername/doorclinik.git
cd doorclinik

🔧 Install Dependencies
npm install

🔑 Environment Variables

Create a .env file with the following:

ATLASDB_URL=<Your MongoDB Atlas Connection String>
SECRET=<Your Session Secret>
CLOUDINARY_CLOUD_NAME=<Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Cloudinary API Key>
CLOUDINARY_API_SECRET=<Cloudinary API Secret>
MAP_TOKEN=<Mapbox Token>
RAZORPAY_KEY_ID=<Your Razorpay Key ID>
RAZORPAY_KEY_SECRET=<Your Razorpay Key Secret>

Run Project
npm run dev

Future Enhancements:

1. Multi-language support
2. Doctor dashboard with analytics
3. Mobile app integration for real-time notifications
4. Appointment reminders via email/SMS