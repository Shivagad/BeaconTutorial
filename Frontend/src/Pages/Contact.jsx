import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import contact from '../../public/images/contact.png';

// FAQ Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className={`w-full p-5 rounded-lg text-left transition-all duration-300 ${
          isOpen ? 'bg-[#4E77BB] text-white' : 'bg-blue-50 hover:bg-blue-100'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-xl font-bold ${isOpen ? 'text-white' : 'text-gray-900'}`}>
            {question}
          </h3>
          {isOpen ? (
            <ChevronUp className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-gray-500'}`} />
          ) : (
            <ChevronDown className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-gray-500'}`} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 ml-5 p-5 bg-white rounded-lg shadow-inner border border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});

  const faqData = [
    {
      question: "What subjects do you offer tutoring for?",
      answer: "We offer comprehensive tutoring for all subjects from grades 8th to 12th, including Mathematics, Science, English, and competitive exam preparation. Our experienced faculty ensures quality education across all subjects."
    },
    {
      question: "What are your teaching methods?",
      answer: "We employ a combination of traditional and modern teaching methods, including interactive sessions, practical demonstrations, regular assessments, and personalized attention. We also use digital tools to enhance learning experience."
    },
    {
      question: "Do you offer online classes?",
      answer: "No,but we are currently in the process of developing our online learning platform. Soon, we will be offering comprehensive online classes with interactive features, recorded sessions, and regular doubt-clearing sessions. Stay tuned for updates!"
    },
    {
      question: "How can I view your course offerings?",
      answer: <span>Visit our <a href="/all-courses" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Courses page</a> to explore our comprehensive range of subjects and programs tailored for different academic levels.</span>
    },
    {
      question: "How do I enroll in your programs?",
      answer: <span>You can easily enroll by visiting our <a href="/inquiry" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Inquiry page</a> or clicking the "Make an Inquiry" button above to get started with the enrollment process.</span>
    },
    {
      question: "Where can I learn more about your success stories?",
      answer: <span>Check out our <a href="/testimonials" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Testimonials page</a> to read about our students' achievements and success stories. You'll find detailed accounts of how our tutoring has helped students excel in their academics.</span>
    },
    {
      question: "Where can I find educational resources and student blogs?",
      answer: <span>Visit our <a href="/student-corner" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Student Corner</a> for access to our educational blog, study materials, and valuable resources to support your learning journey.</span>
    },
    {
      question: "How can I view your latest events and achievements?",
      answer: <span>Check out our <a href="/event-gallery" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Event Gallery</a> to see photos and updates from our recent events, celebrations, and student activities. You can also view our students' outstanding <a href="/all-results" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Results</a> in various examinations.</span>
    },
    {
      question: "Are scholarships available for students?",
      answer: <span>Yes! We offer scholarships to deserving students. Visit our <a href="/scholarship" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Scholarship page</a> to learn about the eligibility criteria and apply using our online application form.</span>
    },
    {
      question: "Want to learn more about Beacon Tutorials?",
      answer: <span>Visit our <a href="/about" className="text-[#4E77BB] hover:text-[#E85900] font-medium">About Us page</a> to learn about our history, mission, vision, and the dedicated team behind Beacon Tutorials. Discover why we're one of the most trusted names in education.</span>
    },
    {
      question: "Where can I view the results of your students?",
      answer: <span>Check out our <a href="/all-results" className="text-[#4E77BB] hover:text-[#E85900] font-medium">Results page</a> to see the achievements of our students. We display the results of various exams and competitions our students participate in.</span>
    },
  ];

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:4000/server/student/contactusemail", formData);
      if (response.data.success) {
        toast.success("Form submitted successfully!");
        setFormData({ name: "", phone: "", email: "", subject: "" });
        setErrors({});
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="bg-[#4E77BB] pt-12 pb-20 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="flex justify-center mb-1">
              <img
                src={contact}
                className="h-20 w-20 filter invert brightness-0 contrast-200"
                alt="Contact"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
              If you have any questions regarding our tuition services, please
              do not hesitate to contact us. Visit us today and we will be more
              than happy to answer any of your questions.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="w-full h-auto">
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Contact Form and Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Card */}
            <div className="lg:col-span-1">
              <div className="bg-blue-100 p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-6">
                  We're here to help! Fill out the form or use the contact
                  information below.
                </p>
                <div className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <a
                    href="mailto:beacontutorials7@gmail.com"
                    className="text-gray-700 hover:text-[#4E77BB]"
                  >
                    beacontutorials7@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                  <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <a
                    href="tel:+918446222268"
                    className="text-gray-700 hover:text-[#4E77BB]"
                  >
                    +91 8446222268
                  </a>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/inquiry")}
                    className="bg-[#E85900] text-white px-6 py-2 rounded-full 
                             transition-transform transform scale-100 hover:scale-105"
                  >
                    Make an Inquiry
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg border-4 shadow-md">
                <p className="text-lg text-gray-700 mb-8 text-center font-bold text-[#4E77BB]">
                  Alternatively, you can fill in the following contact form
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form fields */}
                  <div className="text-center">
                    <label htmlFor="name" className="block text-sm font-bold text-[#4E77BB]">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="John"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 mx-auto rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="text-center">
                    <label htmlFor="phone" className="block text-sm font-bold text-[#4E77BB]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 mx-auto rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="text-center">
                    <label htmlFor="email" className="block text-sm font-bold text-[#4E77BB]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 mx-auto rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="text-center">
                    <label htmlFor="subject" className="block text-sm font-bold text-[#4E77BB]">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      required
                      placeholder="Inquiry about tuition services"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2 block w-3/4 mx-auto rounded-md border border-[#4E77BB] shadow-sm focus:border-[#FFA500] focus:ring-[#FFA500] text-sm py-2 placeholder-gray-400 bg-[#EAF2FF] pl-4"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-auto px-6 py-2 text-sm font-bold text-white bg-[#E85900] hover:bg-[#E85901] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFA500] rounded-md shadow-md transition-colors mx-auto block"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Addresses and Maps Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* First Branch */}
            <div className="flex flex-col space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Beacon Mohan Nagar - Address</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-[#4E77BB] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      Beacon Mohan Nagar, Dhankawadi,
                      Pune - 411043.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="mailto:beacontutorials7@gmail.com" className="text-gray-700 hover:text-[#4E77BB]">
                      beacontutorials7@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="tel:+918446222268" className="text-gray-700 hover:text-[#4E77BB]">
                      +91 8446222268
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-80 rounded-lg shadow-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15138.172850969771!2d73.82754296064374!3d18.45903780649374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaca123c59b5%3A0xd7e3e42fdc95b01e!2sBeacon%20Tutorials!5e0!3m2!1sen!2sin!4v1739267453308!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Second Branch */}
            <div className="flex flex-col space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Beacon Suncity Ambegaon - Address</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-[#4E77BB] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      Beacon Suncity, Ambegaon,
                      Pune - 411046.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="mailto:beacontutorials02.suncity@gmail.com" className="text-gray-700 hover:text-[#4E77BB]">
                      beacontutorials02.suncity@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-[#4E77BB] flex-shrink-0" />
                    <a href="tel:+919527069991" className="text-gray-700 hover:text-[#4E77BB]">
                      +91 9527069991
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-80 rounded-lg shadow-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.7600586347903!2d73.8350821!3d18.449200299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b93229468374967%3A0xfb42b258ba2f112!2sBeacon%20Tutorials!5e0!3m2!1sen!2sin!4v1742133537017!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl p-8 border border-blue-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our tutoring services, teaching methods, and more
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}