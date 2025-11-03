import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const BmiCalculator = () => {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState("");
    const [history, setHistory] = useState([]);

    // Load saved BMI history from localStorage
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
        setHistory(savedHistory);
    }, []);

    // Save BMI history whenever it changes
    useEffect(() => {
        localStorage.setItem("bmiHistory", JSON.stringify(history));
    }, [history]);

    const calculateBMI = (e) => {
        e.preventDefault();

        if (!weight || !height) {
            Swal.fire({
                icon: "warning",
                title: "Missing Info",
                text: "Please enter both height and weight!",
                confirmButtonColor: "#22c55e",
            });
            return;
        }

        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        setBmi(bmiValue);

        let result = "";
        if (bmiValue < 18.5) result = "Underweight";
        else if (bmiValue < 24.9) result = "Normal";
        else if (bmiValue < 29.9) result = "Overweight";
        else result = "Obese";
        setStatus(result);

        // Add new BMI to history
        const newEntry = {
            id: history.length + 1,
            bmi: bmiValue,
            status: result,
            date: new Date().toLocaleDateString(),
        };
        setHistory([...history, newEntry]);

        Swal.fire({
            icon: "success",
            title: "BMI Calculated",
            text: `Your BMI is ${bmiValue} (${result})`,
            confirmButtonColor: "#22c55e",
        });
    };

    const resetForm = () => {
        setWeight("");
        setHeight("");
        setBmi(null);
        setStatus("");
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem("bmiHistory");
        Swal.fire({
            icon: "info",
            title: "Cleared",
            text: "BMI history cleared successfully!",
            confirmButtonColor: "#22c55e",
        });
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4 py-10">
            <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md text-center mb-10">
                <h2 className="text-2xl font-bold mb-4 text-green-400">BMI Calculator</h2>

                <form onSubmit={calculateBMI} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter weight"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter height"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Calculate BMI
                    </button>

                    <button
                        type="button"
                        onClick={resetForm}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Reset
                    </button>
                </form>

                {bmi && (
                    <div className="mt-6 bg-gray-700 rounded-xl p-4">
                        <p className="text-lg">
                            Your BMI: <span className="font-bold text-green-400">{bmi}</span>
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                            Status: <span className="font-semibold">{status}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Chart Section */}
            {history.length > 0 && (
                <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-3xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-green-400">BMI History</h3>
                        <button
                            onClick={clearHistory}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                            Clear History
                        </button>
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={history}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                            <XAxis dataKey="date" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="bmi"
                                stroke="#22c55e"
                                strokeWidth={2}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default BmiCalculator;
