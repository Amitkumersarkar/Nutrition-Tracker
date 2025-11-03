import { useState } from "react";
import { FaAppleAlt, FaBurn, FaDrumstickBite } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { IoMdFitness } from "react-icons/io";

const Dashboard = () => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const stats = [
        { icon: <FaAppleAlt />, label: "Calories", value: 1800, goal: 2200, color: "bg-green-500" },
        { icon: <FaDrumstickBite />, label: "Protein", value: 95, goal: 120, color: "bg-blue-500" },
        { icon: <MdWaterDrop />, label: "Water", value: 2.5, goal: 3, color: "bg-cyan-400" },
        { icon: <IoMdFitness />, label: "Workout", value: 45, goal: 60, color: "bg-orange-500" },
    ];

    const meals = [
        { name: "Oatmeal with fruits", calories: 350 },
        { name: "Grilled chicken salad", calories: 420 },
        { name: "Almonds (snack)", calories: 150 },
        { name: "Steamed fish + rice", calories: 520 },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 style={{ fontFamily: "Rancho, cursive" }} className="text-5xl text-cyan-400 font-bold">Nutrition Dashboard</h1>
                    <p style={{ fontFamily: "Rancho, cursive" }} className="text-gray-400 text-2xl text-center">Track your health and daily goals</p>
                </div>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 mt-4 md:mt-0"
                />
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((item, index) => {
                    const percentage = Math.min((item.value / item.goal) * 100, 100);
                    return (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-2xl p-5 flex flex-col items-start justify-between shadow-lg hover:scale-[1.02] transition-transform"
                        >
                            <div className="flex items-center gap-3 mb-3 text-xl">
                                <span>{item.icon}</span>
                                <span className="font-semibold">{item.label}</span>
                            </div>
                            <p className="text-3xl font-bold">{item.value}</p>
                            <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
                                <div
                                    className={`${item.color} h-2 rounded-full`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                                Goal: {item.goal} {item.label === "Water" ? "L" : item.label === "Workout" ? "min" : "g"}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Meals Section */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Recent Meals 🍱</h2>
                <div className="space-y-3">
                    {meals.map((meal, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center bg-gray-900 p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            <p>{meal.name}</p>
                            <p className="text-green-400 font-semibold">{meal.calories} kcal</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
