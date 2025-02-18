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
      color: "from-rose-400 to-red-500"
    },
    {
      title: "Tailored session arrangements",
      description:
        "We strive to create a learning environment that is safe and encouraging, which allows students to reach their full potential.",
      icon: <Clock className="w-8 h-8" />,
      color: "from-amber-400 to-orange-500"
    },
    {
      title: "Career assessment & Interpretation",
      description:
        "Genius is 10% inspiration, 90% perspiration. Our Career analytics take into account all facets of a student's success.",
      icon: <LineChart className="w-8 h-8" />,
      color: "from-emerald-400 to-teal-500"
    },
    {
      title: "Research based Study Material",
      description:
        "Students can enhance their knowledge and skills & prepare themselves to meet the challenges of their profession.",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-sky-400 to-blue-500"
    },
    {
      title: "Competitive Mock Test Series",
      description:
        "Our experts have created a comprehensive range of practice tests & assessments that meet the needs of students .",
      icon: <Target className="w-8 h-8" />,
      color: "from-violet-400 to-purple-500"
    },
    {
      title: "Unvarying Results & Analysis",
      description:
        "Don't leave your success to chance - choose our Professional team and achieve your goals Because there are no shortcuts.",
      icon: <Award className="w-8 h-8" />,
      color: "from-pink-400 to-rose-500"
    }
  ]

  return (
    <div className="min-h-screen gradient-bg p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <Sparkles className="absolute -left-8 top-6 w-6 h-6 text-yellow-300 animate-glow" />
            <h2 className="text-5xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <Zap className="absolute -right-8 -top-4 w-6 h-6 text-yellow-300 animate-glow" />
          </div>
          <p className="text-xl text-white/80 mt-4 max-w-2xl mx-auto">
            Empowering students with cutting-edge education and personalized
            guidance for exceptional results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const themeColor =
              index % 2 === 0
                ? "from-indigo-500 to-blue-500"
                : "from-green-500 to-teal-500"

            return (
              <div key={index} className="group hover-scale animate-tilt">
                <div className="h-full glass-effect rounded-2xl p-8 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${themeColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${themeColor} p-4 mb-6  shadow-lg`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>

                    <p className="text-white/70 mb-6">{feature.description}</p>

                    {/* <button className="flex items-center text-white/90 hover:text-white group/btn">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button> */}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeWhyChooseUse
