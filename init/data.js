const sampleDoctors = [
  {
    "title": "Dr. Sameer Nair",
    "description": "Sameer Nair is an experienced general physician specializing in preventive care, chronic disease management, and family medicine, with 11 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    "price": 471,
    "location": "Andheri, Mumbai",
    "country": "India",
    "specialization": "General Physician"
  },
  {
    "title": "Dr. Aman Rao",
    "description": "Aman Rao is an experienced general physician specializing in preventive care, chronic disease management, and family medicine, with 18 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/2.jpg"
    },
    "price": 484,
    "location": "Bandra, Mumbai",
    "country": "India",
    "specialization": "General Physician"
  },
  {
    "title": "Dr. Ishaan Sharma",
    "description": "Ishaan Sharma is an experienced general physician specializing in preventive care, chronic disease management, and family medicine, with 14 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    "price": 495,
    "location": "Powai, Mumbai",
    "country": "India",
    "specialization": "General Physician"
  },
  {
    "title": "Dr. Deepika Das",
    "description": "Deepika Das is an experienced general physician specializing in preventive care, chronic disease management, and family medicine, with 15 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/1.jpg"
    },
    "price": 453,
    "location": "Malad, Mumbai",
    "country": "India",
    "specialization": "General Physician"
  },
  {
    "title": "Dr. Siddharth Sinha",
    "description": "Siddharth Sinha is a senior cardiologist trained in interventional cardiology, focused on heart disease prevention and long-term cardiac care, with 11 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/4.jpg"
    },
    "price": 1162,
    "location": "Thane, Mumbai",
    "country": "India",
    "specialization": "Cardiologist"
  },
  {
    "title": "Dr. Arjun Kaur",
    "description": "Arjun Kaur is a senior cardiologist trained in interventional cardiology, focused on heart disease prevention and long-term cardiac care, with 12 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    "price": 1155,
    "location": "Vashi, Navi Mumbai",
    "country": "India",
    "specialization": "Cardiologist"
  },
  {
    "title": "Dr. Aditya Deshmukh",
    "description": "Aditya Deshmukh is a senior cardiologist trained in interventional cardiology, focused on heart disease prevention and long-term cardiac care, with 13 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/6.jpg"
    },
    "price": 1307,
    "location": "Kandivali, Mumbai",
    "country": "India",
    "specialization": "Cardiologist"
  },
  {
    "title": "Dr. Rajesh Gupta",
    "description": "Rajesh Gupta is a senior cardiologist trained in interventional cardiology, focused on heart disease prevention and long-term cardiac care, with 11 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/7.jpg"
    },
    "price": 1036,
    "location": "Ghatkopar, Mumbai",
    "country": "India",
    "specialization": "Cardiologist"
  },
  {
    "title": "Dr. Sneha Pillai",
    "description": "Sneha Pillai is a consultant neurologist with expertise in migraine management, epilepsy, and stroke rehabilitation, with 16 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    "price": 1158,
    "location": "Dadar, Mumbai",
    "country": "India",
    "specialization": "Neurologist"
  },
  {
    "title": "Dr. Rahul Bose",
    "description": "Rahul Bose is a consultant neurologist with expertise in migraine management, epilepsy, and stroke rehabilitation, with 6 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/8.jpg"
    },
    "price": 908,
    "location": "Borivali, Mumbai",
    "country": "India",
    "specialization": "Neurologist"
  },
  {
    "title": "Dr. Kiran Iyer",
    "description": "Kiran Iyer is a consultant neurologist with expertise in migraine management, epilepsy, and stroke rehabilitation, with 8 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/9.jpg"
    },
    "price": 977,
    "location": "Chembur, Mumbai",
    "country": "India",
    "specialization": "Neurologist"
  },
  {
    "title": "Dr. Ananya Mehta",
    "description": "Ananya Mehta is a consultant neurologist with expertise in migraine management, epilepsy, and stroke rehabilitation, with 10 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/3.jpg"
    },
    "price": 937,
    "location": "Juhu, Mumbai",
    "country": "India",
    "specialization": "Neurologist"
  },
  {
    "title": "Dr. Manish Menon",
    "description": "Manish Menon is a dental surgeon offering cosmetic dentistry, root canal treatment, and orthodontic care, with 6 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/10.jpg"
    },
    "price": 497,
    "location": "Goregaon, Mumbai",
    "country": "India",
    "specialization": "Dentist"
  },
  {
    "title": "Dr. Shreya Chatterjee",
    "description": "Shreya Chatterjee is a dental surgeon offering cosmetic dentistry, root canal treatment, and orthodontic care, with 4 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    "price": 424,
    "location": "Mulund, Mumbai",
    "country": "India",
    "specialization": "Dentist"
  },
  {
    "title": "Dr. Nikhil Saxena",
    "description": "Nikhil Saxena is a dental surgeon offering cosmetic dentistry, root canal treatment, and orthodontic care, with 11 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/11.jpg"
    },
    "price": 476,
    "location": "Worli, Mumbai",
    "country": "India",
    "specialization": "Dentist"
  },
  {
    "title": "Dr. Ritu Reddy",
    "description": "Ritu Reddy is an ophthalmologist specializing in cataract surgery, LASIK, and comprehensive eye examinations, with 7 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/5.jpg"
    },
    "price": 557,
    "location": "Andheri, Mumbai",
    "country": "India",
    "specialization": "Eye Specialist"
  },
  {
    "title": "Dr. Varun Kulkarni",
    "description": "Varun Kulkarni is an ophthalmologist specializing in cataract surgery, LASIK, and comprehensive eye examinations, with 7 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/12.jpg"
    },
    "price": 655,
    "location": "Bandra, Mumbai",
    "country": "India",
    "specialization": "Eye Specialist"
  },
  {
    "title": "Dr. Meera Bansal",
    "description": "Meera Bansal is an ophthalmologist specializing in cataract surgery, LASIK, and comprehensive eye examinations, with 9 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/6.jpg"
    },
    "price": 680,
    "location": "Powai, Mumbai",
    "country": "India",
    "specialization": "Eye Specialist"
  },
  {
    "title": "Dr. Karan Shetty",
    "description": "Karan Shetty is a pediatrician with a gentle approach to child healthcare, from newborn checkups to adolescent wellness, with 18 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/13.jpg"
    },
    "price": 555,
    "location": "Malad, Mumbai",
    "country": "India",
    "specialization": "Pediatrician"
  },
  {
    "title": "Dr. Kavita Nambiar",
    "description": "Kavita Nambiar is a pediatrician with a gentle approach to child healthcare, from newborn checkups to adolescent wellness, with 8 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/7.jpg"
    },
    "price": 638,
    "location": "Thane, Mumbai",
    "country": "India",
    "specialization": "Pediatrician"
  },
  {
    "title": "Dr. Tanvi Malhotra",
    "description": "Tanvi Malhotra is a pediatrician with a gentle approach to child healthcare, from newborn checkups to adolescent wellness, with 5 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/8.jpg"
    },
    "price": 541,
    "location": "Vashi, Navi Mumbai",
    "country": "India",
    "specialization": "Pediatrician"
  },
  {
    "title": "Dr. Priya Chauhan",
    "description": "Priya Chauhan is a family medicine practitioner offering full vaccination schedules for children and adults, with 11 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/9.jpg"
    },
    "price": 342,
    "location": "Kandivali, Mumbai",
    "country": "India",
    "specialization": "Vaccination"
  },
  {
    "title": "Dr. Ajay Verma",
    "description": "Ajay Verma is a family medicine practitioner offering full vaccination schedules for children and adults, with 20 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/14.jpg"
    },
    "price": 317,
    "location": "Ghatkopar, Mumbai",
    "country": "India",
    "specialization": "Vaccination"
  },
  {
    "title": "Dr. Vikram Agarwal",
    "description": "Vikram Agarwal is a family medicine practitioner offering full vaccination schedules for children and adults, with 7 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/15.jpg"
    },
    "price": 255,
    "location": "Dadar, Mumbai",
    "country": "India",
    "specialization": "Vaccination"
  },
  {
    "title": "Dr. Rohan Kapoor",
    "description": "Rohan Kapoor is a diagnostics specialist offering comprehensive lab testing, imaging referrals, and health screening packages, with 8 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/men/16.jpg"
    },
    "price": 397,
    "location": "Borivali, Mumbai",
    "country": "India",
    "specialization": "Diagnostics"
  },
  {
    "title": "Dr. Anjali Joshi",
    "description": "Anjali Joshi is a diagnostics specialist offering comprehensive lab testing, imaging referrals, and health screening packages, with 4 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/10.jpg"
    },
    "price": 332,
    "location": "Chembur, Mumbai",
    "country": "India",
    "specialization": "Diagnostics"
  },
  {
    "title": "Dr. Neha Trivedi",
    "description": "Neha Trivedi is a diagnostics specialist offering comprehensive lab testing, imaging referrals, and health screening packages, with 10 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/11.jpg"
    },
    "price": 360,
    "location": "Juhu, Mumbai",
    "country": "India",
    "specialization": "Diagnostics"
  },
  {
    "title": "Dr. Pooja Choudhary",
    "description": "Pooja Choudhary is a dermatologist and general wellness consultant offering skin care and holistic health guidance, with 8 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/12.jpg"
    },
    "price": 538,
    "location": "Goregaon, Mumbai",
    "country": "India",
    "specialization": "Other"
  },
  {
    "title": "Dr. Divya Patel",
    "description": "Divya Patel is a dermatologist and general wellness consultant offering skin care and holistic health guidance, with 9 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/13.jpg"
    },
    "price": 454,
    "location": "Mulund, Mumbai",
    "country": "India",
    "specialization": "Other"
  },
  {
    "title": "Dr. Sunita Bhatt",
    "description": "Sunita Bhatt is a dermatologist and general wellness consultant offering skin care and holistic health guidance, with 12 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://randomuser.me/api/portraits/women/14.jpg"
    },
    "price": 423,
    "location": "Worli, Mumbai",
    "country": "India",
    "specialization": "Other"
  }
];

module.exports = { data: sampleDoctors };