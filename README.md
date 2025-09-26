Doorclinik

Doorclinik is a AI Integrated Full-Stack Doctor appointment platform designed to streamline healthcare interactions for both patients and doctors. It offers features such as doctor listings, appointment booking, real-time notifications, secure payments, and review management, all within a modern, intuitive, and responsive interface. Additionally, the platform integrates AI-powered tools, including a summarizer for quick consultation summaries and image generation to enhance patient engagement and content visualization. Doorclinik combines advanced technology with user-centric design to provide a seamless and efficient healthcare experience.

Project Contributors - Akashdeep Kumar

Features-

Patient Features-
1. Signup-Login to see the list of doctors.
2. Browse and search doctors by specialization or location
3. Check availability and book appointments
4. Receive notifications for confirmed appointments
5. View appointment history and past reviews
6. Leave reviews for doctors
7. AI-Powered Summarizer generates quick consultation summaries for easy reference.
8. AI Image Generation for visual insights, health tips, or doctor profiles.

Doctor Features-
1. Signup-Login to add, edit, and manage clinic/his/her listings
2. Upload and store his/her profile images using Cloudinary
3. Communicate with patients via notifications
4. Track appointments and earnings
5. View reviews left by patients

Project Highlights:

1. Role-Based Authentication: Admin, Doctor, and Patient login using Passport.js with secure session management.
2. Real-Time Notifications: Instant appointment alerts for doctors via Socket.IO.
3. Cloudinary Integration: Secure storage of doctor and clinic images, with URLs saved in MongoDB.
4. MVC Architecture: Clear separation of concerns with Models, Views (EJS), and Controllers/Routes.
5. Mapbox Integration: Interactive clinic location maps with markers for enhanced UX.
6. Razorpay Payments: Seamless online payments with automatic booking status updates.
7. Smart Booking Flow: Validates dates, checks slot availability, and prevents conflicts.
8. Reviews & Ratings: Dynamic patient feedback displayed on doctor profiles.
9. AI Integration: Consultation summarizer for patients and AI-powered image generation for profiles/content.
10. Secure Database: MongoDB Atlas with normalized schemas for users, doctors, bookings, and reviews.
11. Enhanced Security: Helmet.js CSP, session-based auth, and MongoStore for safe data handling.

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
Hugging Face API for AI-powered summarization and NLP features
Cloudflare for AI Image Generation
Socket.IO for real-time communication
Cloudinary SDK for image uploads
Express-Session & Flash for sessions and notifications
Helmet.js for security
Razorpay for payment processing

Workflow:

1. User Authentication: Patients, Doctors, and Admins register and log in with role-based access.
2. Clinic Management: Doctors add/edit clinics, upload images, and manage appointment slots.
3. Smart Booking Process: Patients select slots; system validates availability and confirms appointments after payment.
4. Real-Time Notifications: Doctors receive instant alerts for new bookings.
5. Reviews & Ratings: Patients leave feedback post-appointment; visible to all users.
6. Admin Controls: Admin manages users, blocks/unblocks accounts, and monitors platform activity.
7. AI Integration: Hugging Face generates consultation summaries and AI-powered images enhance profiles and content visualization.

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
HF_API_KEY=<Your API Key here>
WORKER_URL=<Your URL id here>
WORKER_KEY=<Your key here>


Run Project
npm run dev

Future Enhancements:

1. Multi-language support
2. Doctor dashboard with analytics
3. Mobile app integration for real-time notifications
4. Appointment reminders via email/SMS