// knowledgeBase/faqData.js
// Each entry is a self-contained chunk of content the chatbot can retrieve and answer from.
// Keep entries short and factual — this is what grounds the bot's answers.

const faqEntries = [
  {
    id: "booking-1",
    topic: "booking",
    content:
      "To book an appointment on Doorclinik, browse doctors by specialization or search by name/location, open a doctor's profile page, and click 'Book Appointment'. You'll choose an available time slot and confirm your booking. You must be logged in as a patient to book.",
  },
  {
    id: "booking-2",
    topic: "booking",
    content:
      "You can view your upcoming and past bookings from your patient dashboard. If you need to cancel or reschedule, go to your bookings list and select the appointment you want to change.",
  },
  {
    id: "signup-1",
    topic: "account",
    content:
      "To create an account, click Sign Up and choose whether you're registering as a Patient or a Doctor. Patients can browse and book appointments. Doctors can list their services and manage bookings from patients.",
  },
  {
    id: "signup-2",
    topic: "account",
    content:
      "If you're a doctor, after signing up you can create a listing with your specialization, consultation fee, location, and description so patients can find and book you.",
  },
  {
    id: "specialization-general",
    topic: "specialization",
    content:
      "A General Physician handles common illnesses, checkups, and general health concerns, and can refer you to a specialist if needed. This is usually the right first stop if you're not sure which specialist to see.",
  },
  {
    id: "specialization-cardiologist",
    topic: "specialization",
    content:
      "A Cardiologist treats heart and blood vessel conditions — chest pain, high blood pressure, irregular heartbeat, and heart disease prevention and management.",
  },
  {
    id: "specialization-neurologist",
    topic: "specialization",
    content:
      "A Neurologist treats conditions of the brain, spine, and nervous system — including migraines, seizures, memory issues, and nerve-related pain or numbness.",
  },
  {
    id: "specialization-dentist",
    topic: "specialization",
    content:
      "A Dentist handles oral health — cavities, root canals, teeth cleaning, orthodontics, and general dental care.",
  },
  {
    id: "specialization-eye",
    topic: "specialization",
    content:
      "An Eye Specialist (Ophthalmologist) handles vision problems, eye exams, cataracts, and other eye health concerns.",
  },
  {
    id: "specialization-pediatrician",
    topic: "specialization",
    content:
      "A Pediatrician specializes in healthcare for infants, children, and teenagers, including growth checkups and childhood illnesses.",
  },
  {
    id: "specialization-vaccination",
    topic: "specialization",
    content:
      "Doctors listed under Vaccination provide immunization services for children and adults, including routine and travel vaccines.",
  },
  {
    id: "specialization-diagnostics",
    topic: "specialization",
    content:
      "Doctors listed under Diagnostics offer lab testing, imaging referrals, and general health screening packages.",
  },
  {
    id: "payments-1",
    topic: "payments",
    content:
      "Online payments are planned for Doorclinik but not yet available. Currently, appointment booking does not require payment through the platform.",
  },
  {
    id: "reviews-1",
    topic: "reviews",
    content:
      "After a completed appointment, patients can leave a review and rating for the doctor. Reviews help other patients choose the right doctor and appear on the doctor's profile page.",
  },
  {
    id: "ai-report-1",
    topic: "ai_features",
    content:
      "Doorclinik lets patients upload medical reports and ask questions about them in plain language. The system reads the report and answers based only on its contents — it does not replace professional medical advice.",
  },
  {
    id: "notifications-1",
    topic: "notifications",
    content:
      "Doorclinik sends real-time notifications for booking confirmations and updates using a live connection, so you don't need to refresh the page to see status changes.",
  },
  {
    id: "scope-1",
    topic: "scope_limits",
    content:
      "This assistant can help you navigate Doorclinik, explain how features work, and suggest which type of specialist might be relevant based on general symptoms you describe. It cannot diagnose conditions, prescribe treatment, or replace consulting an actual doctor. For any specific medical concern, please book an appointment with a relevant specialist.",
  },
];

module.exports = { faqEntries };