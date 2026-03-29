import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [skills, setSkills] = useState("");
  const [courses, setCourses] = useState([]);
  const [path, setPath] = useState([]);
  const [dark, setDark] = useState(false);

  const getData = async () => {
    const res = await axios.post("http://localhost:5000/api/recommend", {
      skills: skills.split(","),
    });

    setCourses(res.data.courses);
    setPath(res.data.path);
  };

  // Dummy progress data (for chart)
  const chartData = [
    { name: "Day 1", progress: 10 },
    { name: "Day 2", progress: 30 },
    { name: "Day 3", progress: 50 },
    { name: "Day 4", progress: 70 },
    { name: "Day 5", progress: 90 },
  ];

  return (
    <div className={`${dark ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-100 via-white to-blue-200"} min-h-screen transition-all`}>

      {/* NAVBAR */}
      <div className="flex justify-between items-center p-5">
        <h1 className="text-2xl font-bold">📚 LearnSmart 💙</h1>
        <button
          onClick={() => setDark(!dark)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* FLOATING EMOJIS */}
      <div className="absolute w-full h-full opacity-10 text-4xl flex flex-wrap justify-around pointer-events-none">
        <span>📚</span><span>🧠</span><span>🎓</span><span>💡</span>
      </div>

      {/* INPUT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-lg bg-white/60 dark:bg-gray-800 p-6 rounded-2xl w-[60%] mx-auto shadow-xl"
      >
        <h2 className="text-xl mb-3">✨ Enter Skills</h2>
        <input
          className="w-full p-3 rounded-xl border outline-none"
          placeholder="java, python"
          onChange={(e) => setSkills(e.target.value)}
        />
        <button
          onClick={getData}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl"
        >
          Get Recommendations 🚀
        </button>
      </motion.div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6 w-[80%] mx-auto mt-10">

        {/* COURSES */}
        <motion.div className="bg-white/60 dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold mb-3">📊 Courses</h2>
          {courses.map((c, i) => (
            <p key={i} className="p-2 bg-blue-100 dark:bg-gray-700 rounded-lg mb-2">
              📘 {c}
            </p>
          ))}
        </motion.div>

        {/* PATH */}
        <motion.div className="bg-white/60 dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold mb-3">🧠 Learning Path</h2>
          {path.map((p, i) => (
            <p key={i} className="p-2 bg-blue-50 dark:bg-gray-700 rounded-lg mb-2">
              ➡️ {p}
            </p>
          ))}
        </motion.div>

      </div>

      {/* CHART */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="w-[80%] mx-auto mt-10 bg-white/60 dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">📈 Learning Progress</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
}