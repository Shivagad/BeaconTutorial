import Fuse from "fuse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const faqs = [
    { "question": "What courses do you offer?", "answer": "We offer courses for JEE, NEET, CBSE, ICSE, HSC, SSC, MHT-CET, NDA, CUET, IISER, and NTSE." },
    { "question": "Do you offer online classes?", "answer": "No, we offer both  offline classes with mock exam  for students." },
    { "question": "Where is Beacon Tutorial located?", "answer": "We are located in Pune. Visit our website  at beacontutorials.com for the exact address and Google Maps link." },
    { "question": "What are the batch timings?", "answer": "Batch timings vary by course. Please check our website or contact our office for details." },
    { "question": "What is the fee structure?", "answer": "The fee structure depends on the course and duration. Contact us for a detailed breakdown." },
    { "question": "Do you provide study material?", "answer": "Yes, we provide comprehensive study material, question banks, and mock tests for all courses." },
    { "question": "Is there a scholarship program?", "answer": "Yes, we offer scholarships based on merit and financial need. Contact us for eligibility criteria." },
    { "question": "Do you conduct mock tests?", "answer": "Yes, we conduct regular mock tests for JEE, NEET, and board exams." },
    { "question": "How can I enroll in a course?", "answer": "You can enroll online through our website or visit our institute for offline registration." },
    { "question": "What is the qualification of your faculty?", "answer": "Our faculty consists of experienced educators and subject matter experts from IITs, NITs, and medical backgrounds." },
    { "question": "Do you offer doubt-clearing sessions?", "answer": "Yes, we have dedicated doubt-solving sessions, and students can also ask doubts through our mobile app." },
    { "question": "What is the student-teacher ratio?", "answer": "We maintain a low student-teacher ratio to ensure personalized attention for every student." },
    { "question": "Do you provide hostel or accommodation facilities?", "answer": "Yes, we assist students in finding hostels and PG accommodations near our institute." },
    { "question": "Can I take a demo class?", "answer": "Yes, we offer free demo classes. Contact us to schedule one." },
    { "question": "How do I check my performance in tests?", "answer": "Students can check their performance on our student portal and mobile app." },
    { "question": "Do you offer career counseling?", "answer": "Yes, we provide career counseling sessions to help students choose the right career path." },
    { "question": "Is there an attendance tracking system?", "answer": "Yes, parents can track their child's attendance through our mobile app." },
    { "question": "How can I contact support?", "answer": "You can contact us via phone, email, or visit our institute for any inquiries." },
    { "question": "What is your refund policy?", "answer": "We have a refund policy for specific cases. Please check our terms and conditions or contact us for details." },
    { "question": "Do you provide revision classes?", "answer": "Yes, we conduct revision and crash courses before exams." },
    { "question": "Are classes recorded for later viewing?", "answer": "Yes, online classes are recorded and available for students to revisit anytime." },
    { "question": "hi | hello | who are you", "answer": "Welcome to Beacon Tutorials! 🌟 Your journey to academic excellence starts here. Whether you're preparing for JEE, NEET, CBSE, ICSE, or any competitive exam, we're here to guide you every step of the way. Let’s achieve success together! 🚀📚" },
    { "question": "What makes Beacon Tutorial different from other institutes?", "answer": "We provide personalized mentoring, small batch sizes, excellent faculty, and a structured learning approach." }
]

const fuse = new Fuse(faqs, { keys: ["question"], threshold: 0.3 });
async function getAnswer(userQuestion) {
    const result = fuse.search(userQuestion);

    if (result.length > 0) {
        return result[0].item.answer; 
    }
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY_CHATBOT);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const chat = model.startChat();
        const response = await chat.sendMessage(
            `Answer this based on my coaching institute FAQs: ${JSON.stringify(faqs)}. 
            If the answer is not found in the FAQs, respond with: 
            "The answer to your question is not available in our FAQs. Please contact our admin through the contact page." 
            Question: ${userQuestion}`
        );

        return response.response.text();  
    } catch (error) {
        console.error("Error:", error);
        return "I'm unable to answer at the moment. Please contact support.";
    }
}

export async function handleChat(req, res) {
    const { message } = req.body;
    const reply = await getAnswer(message);
    res.json({ reply });
}
