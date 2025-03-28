import React from "react";
import { Github, Linkedin } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Developers = () => {
  const teachers = [
    {
      name: "Prof.Pranali R Navghare",
      image: "/images/pranalimam.jpg",
      bio: "Assistant Professor at Pune Institute of Computer Technology",
    },
    {
      name: "Ruturaj Patil",
      image: "/images/ruturajpatil.jpg",
      bio: "Technical Head at Beacon Tutorial (Pune)",
    },
    {
      name: "Akshay Sir",
      image: "/images/akshaysir.JPG",
      bio: "Physics Faculty At Beacon Tutorial (Pune)",
    },
  ];

  const developers = [
    {
      name: "Om Kumavat",
      college: "PICT",
      Department: "Computer Engineering",
      image: "/images/omkumavat.jpg",
      linkedin: "https://www.linkedin.com/in/om-kumavat-a34296258/",
      github: "https://github.com/omkumavat",
    },
    {
      name: "Shivaji Gadekar",
      college: "PICT",
      Department: "Computer Engineering",
      image: "/images/shivajiphoto.jpg",
      linkedin: "https://www.linkedin.com/in/shivaji-gadekar-bbb871264/",
      github: "https://github.com/Shivagad",
    },
    {
      name: "Rajvardhan Deshmukh",
      college: "PICT",
      Department: "Information Technology",
      image: "/images/rajphoto.jpg",
      linkedin: "http://www.linkedin.com/in/rajvardhan-deshmukh-323787229",
      github: "https://github.com/raj-deshmukh6403",
    },
    {
      name: "Abhijeet Lahase",
      college: "PICT",
      Department: "Computer Engineering",
      image: "/images/abhijeetphoto.jpg",
      linkedin:
        "https://www.linkedin.com/in/abhijeet-lahase-41769225b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/AbhijeetLahase",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="bg-[#4E77BB] pt-12 pb-20 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="flex justify-center mb-1">
              <img
                src={"/images/developers.png"}
                className="h-20 w-20 filter invert brightness-0 contrast-200"
                alt="Contact"
              />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Excellence in Education Technology
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
              Our coaching center combines cutting-edge technology with expert
              guidance to deliver an unparalleled learning experience. Our
              platform is built by passionate developers who understand the
              needs of modern education.
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

        {/* Teachers Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                UNDER THE GUIDANCE OF
              </h2>
              <div className="w-40 mx-auto border-b-4 border-[#4E77BB]"></div>
            </div>

            <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto md:grid-cols-2 md:grid-rows-2">
              {teachers.length > 0 && (
                <div className="flex flex-col items-center md:col-span-2 hover:scale-105 transition-transform duration-300">
                  <img
                    src={teachers[0].image}
                    alt={teachers[0].name}
                    className="w-[350px] h-[360px] object-cover object-top shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {teachers[0].name}
                  </h3>
                  <p className="text-gray-600 mb-2">{teachers[0].bio}</p>
                </div>
              )}
              {teachers.slice(1).map((teacher, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-[350px] h-[360px] object-cover object-top shadow-lg mb-4"
                  />

                  <h3 className="text-xl font-semibold text-gray-800">
                    {teacher.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{teacher.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Developers Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                OUR DEVELOPMENT TEAM
              </h2>
              <div className="w-40 mx-auto border-b-4 border-[#4E77BB]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {developers.map((dev, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-[320px] h-[330px] object-cover shadow-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {dev.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{dev.college}</p>
                  <p className="text-gray-600 mb-2">{dev.Department}</p>
                  <div className="flex space-x-4">
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Developers;
