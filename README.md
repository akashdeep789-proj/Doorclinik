Doorclinik

Doorclinik is a full-stack doctor appointment platform designed to simplify appointment booking for patients and clinic management for doctors. It provides features for doctor listings, booking appointments, real-time notifications, secure payments, and review management, all presented in a modern, user-friendly interface.

Project Contributors - Akashdeep Kumar

Features-

Patient Features-
1. Signup-Login to see the list of doctors.
2. Browse and search doctors by specialization or location
3. Check availability and book appointments
4. Receive notifications for confirmed appointments
5. View appointment history and past reviews
6. Leave reviews for doctors

Doctor Features-
1. Signup-Login to add, edit, and manage clinic/his/her listings
2. Upload and store his/her profile images using Cloudinary
3. Communicate with patients via notifications
4. Track appointments and earnings
5. View reviews left by patients

Admin Features-
1. Act as third party websites

Project Highlights-

1. Authentication: Role-based login for Admin, Doctor, and Patient using Passport.js with session management.
2. Real-time Notifications: Appointment notifications for doctors powered by Socket.IO.
3. Cloudinary Integration: Store doctor profile images and clinic images securely, URLs saved in MongoDB.
4. MVC Structure: Implements the Model-View-Controller (MVC) pattern with models for data, views for EJS templates, and controllers/routes for application logic.
5. Mapbox Integration: Uses Mapbox API to display clinic locations interactively on maps with markers for better UX.
6. Razorpay Integration: Enables patients to pay for appointments online; payment status updates the booking status automatically.
7. Booking Flow: Full appointment booking system with date validation, slot availability checks, and conflict prevention.
8. Reviews & Ratings: Patients can leave reviews for doctors, displayed dynamically.
9. Database: MongoDB Atlas backend using with normalized schemas for users, doctors, bookings, and reviews.
10. Security: Helmet.js Content Security Policy and session-based authentication with MongoStore.

Tech Stack
🔹 Frontend

EJS Templates
Bootstrap 5
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