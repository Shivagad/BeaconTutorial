import React from "react"
import {
  Users,
  Clock,
  LineChart,
  BookOpen,
  Target,
  Award,
  Sparkles,
  Zap,
  ChevronRight
} from "lucide-react"

function HomeWhyChooseUse() {
  const features = [
    {
      title: "Experienced Professors and Infrastructure",
      description:
        "Our faculty of industry specialists ensures that students receive knowledge that is not only theoretical but also practical.",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-500"
    },
    {
      title: "Tailored Session Arrangements",
      description:
        "We strive to create a learning environment that is safe and encouraging, allowing students to reach their full potential.",
      icon: <Clock className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-400"
    },
    {
      title: "Career Assessment & Interpretation",
      description:
        "Genius is 10% inspiration, 90% perspiration. Our career analytics take into account all facets of a student's success.",
      icon: <LineChart className="w-8 h-8" />,
      color: "from-teal-600 to-green-400"
    },
    {
      title: "Research-Based Study Material",
      description:
        "Students can enhance their knowledge and skills & prepare themselves to meet the challenges of their profession.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-indigo-600 to-blue-400"
    },
    {
      title: "Competitive Mock Test Series",
      description:
        "Our experts have created a comprehensive range of practice tests & assessments to meet the needs of students.",
      icon: <Target className="w-8 h-8" />,
      color: "from-yellow-600 to-orange-500"
    },
    {
      title: "Consistent Results & Analysis",
      description:
        "Don't leave your success to chance. Choose our professional team and achieve your goals because there are no shortcuts.",
      icon: <Award className="w-8 h-8" />,
      color: "from-purple-600 to-pink-500"
    }
  ]

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-blue-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 left-16 w-72 h-72 bg-blue-400/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-16 right-16 w-96 h-96 bg-yellow-400/20 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <Sparkles className="absolute -left-8 top-6 w-6 h-6 text-yellow-400 animate-glow" />
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <Zap className="absolute -right-8 -top-4 w-6 h-6 text-yellow-400 animate-glow" />
          </div>
          <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
            Empowering students with cutting-edge education and personalized
            guidance for exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group hover-scale animate-tilt">
              <div className="h-full bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-6 shadow-lg`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-700 mb-6">{feature.description}</p>

                  {/* Optional Learn More Button */}
                  {/* 
                  <button className="flex items-center text-blue-600 hover:text-blue-800 group/btn">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button> 
                  */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeWhyChooseUse
