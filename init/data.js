const sampleDoctors = [
  {
    "title": "Dr. Sameer Nair",
    "description": "Sameer Nair is an experienced general physician specializing in preventive care, chronic disease management, and family medicine, with 11 years of clinical experience.",
    "image": {
      "filename": "listingimage",
      "url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=60"
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
      "url": "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=60"
    },
    "price": 423,
    "location": "Worli, Mumbai",
    "country": "India",
    "specialization": "Other"
  }
];

module.exports = { data: sampleDoctors };