import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Input = ({ label, name, value, type = "text", onChange, placeholder }) => (
    <div className="flex flex-col">
        <label className="block mb-1 font-medium text-white">{label}</label>
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full bg-black text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
    </div>
);

const Select = ({ label, name, value, onChange, options }) => (
    <div className="flex flex-col">
        <label className="block mb-1 font-medium text-white">{label}</label>
        <select
            name={name}
            value={value || ""}
            onChange={onChange}
            required
            className="w-full bg-black text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    </div>
);

const Textarea = ({ label, name, value, onChange, placeholder }) => (
    <div className="flex flex-col">
        <label className="block mb-1 font-medium text-white">{label}</label>
        <textarea
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            required
            rows={3}
            className="w-full bg-black text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
    </div>
);


const MealEntry = () => {
    const [userData, setUserData] = useState({
        name: "",
        gender: "",
        height: "",
        weight: "",
        birthdate: "",
        goal: "",
        activity: "",
    });

    const [meal, setMeal] = useState({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        date: "",
        time: "",
        notes: "",
    });

    const [bmi, setBmi] = useState(null);
    const [calorieGoal, setCalorieGoal] = useState(null);

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === "user") setUserData(prev => ({ ...prev, [name]: value }));
        else setMeal(prev => ({ ...prev, [name]: value }));
    };

    // Calculate BMI
    useEffect(() => {
        const heightNum = parseFloat(userData.height);
        const weightNum = parseFloat(userData.weight);
        if (heightNum && weightNum) {
            const h = heightNum / 100;
            setBmi((weightNum / (h * h)).toFixed(1));
        } else setBmi(null);
    }, [userData.height, userData.weight]);

    // Calculate Calorie Goal
    useEffect(() => {
        const { gender, weight, height, birthdate, goal, activity } = userData;
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (gender && weightNum && heightNum && birthdate && goal && activity) {
            const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
            let bmr =
                gender === "male"
                    ? 10 * weightNum + 6.25 * heightNum - 5 * age + 5
                    : 10 * weightNum + 6.25 * heightNum - 5 * age - 161;

            const activityMultiplier = {
                sedentary: 1.2,
                light: 1.375,
                moderate: 1.55,
                active: 1.725,
                very: 1.9,
            }[activity];

            let calories = bmr * activityMultiplier;
            if (goal === "lose") calories -= 500;
            if (goal === "gain") calories += 500;

            setCalorieGoal(Math.round(calories));
        } else setCalorieGoal(null);
    }, [userData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Meal & User Info Submitted",
            text: "Your data has been saved successfully!",
            confirmButtonColor: "#06b6d4",
        });
        // Reset all fields after submit
        setUserData({
            name: "",
            gender: "",
            height: "",
            weight: "",
            birthdate: "",
            goal: "",
            activity: "",
        });
        setMeal({
            name: "",
            calories: "",
            protein: "",
            carbs: "",
            fat: "",
            date: "",
            time: "",
            notes: "",
        });
        setBmi(null);
        setCalorieGoal(null);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 mb-12 p-6 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-5xl font-semibold mb-6 text-center text-cyan-400" style={{ fontFamily: "Rancho, cursive" }}>
                📋 User & Meal Info
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-gray-800 p-5 rounded-lg shadow-md space-y-4">
                    <h3 className="text-xl font-medium text-cyan-400">User Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Name" name="name" value={userData.name} onChange={(e) => handleChange(e, "user")} placeholder="Enter your full name" />
                        <Select
                            label="Gender"
                            name="gender"
                            value={userData.gender}
                            onChange={(e) => handleChange(e, "user")}
                            options={[
                                { label: "Select Gender", value: "" },
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                                { label: "Other", value: "other" },
                            ]}
                        />
                        <Input label="Height (cm)" name="height" type="number" value={userData.height} onChange={(e) => handleChange(e, "user")} placeholder="e.g. 175" />
                        <Input label="Weight (kg)" name="weight" type="number" value={userData.weight} onChange={(e) => handleChange(e, "user")} placeholder="e.g. 65" />
                        <Input label="Birthdate" name="birthdate" type="date" value={userData.birthdate} onChange={(e) => handleChange(e, "user")} placeholder="Select your birthdate" />
                        <Select
                            label="Goal"
                            name="goal"
                            value={userData.goal}
                            onChange={(e) => handleChange(e, "user")}
                            options={[
                                { label: "Select Goal", value: "" },
                                { label: "Lose Weight", value: "lose" },
                                { label: "Maintain Weight", value: "maintain" },
                                { label: "Gain Weight", value: "gain" },
                            ]}
                        />
                        <Select
                            label="Activity Level"
                            name="activity"
                            value={userData.activity}
                            onChange={(e) => handleChange(e, "user")}
                            options={[
                                { label: "Select Activity", value: "" },
                                { label: "Sedentary", value: "sedentary" },
                                { label: "Lightly Active", value: "light" },
                                { label: "Moderately Active", value: "moderate" },
                                { label: "Active", value: "active" },
                                { label: "Very Active", value: "very" },
                            ]}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-3 text-white">
                        {bmi && <div className="bg-cyan-600 text-white px-4 py-2 rounded-md font-semibold">BMI: {bmi}</div>}
                        {calorieGoal && <div className="bg-cyan-600 text-white px-4 py-2 rounded-md font-semibold">Daily Calorie Goal: {calorieGoal} kcal</div>}
                    </div>
                </div>

                <div className="bg-gray-800 p-5 rounded-lg shadow-md space-y-4">
                    <h3 className="text-xl font-medium text-cyan-400">Meal Info</h3>
                    <Input label="Meal Name" name="name" value={meal.name} onChange={(e) => handleChange(e, "meal")} placeholder="e.g. Grilled Chicken Salad" />
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <Input label="Calories" name="calories" type="number" value={meal.calories} onChange={(e) => handleChange(e, "meal")} placeholder="e.g. 400" />
                        <Input label="Protein (g)" name="protein" type="number" value={meal.protein} onChange={(e) => handleChange(e, "meal")} placeholder="e.g. 30" />
                        <Input label="Carbs (g)" name="carbs" type="number" value={meal.carbs} onChange={(e) => handleChange(e, "meal")} placeholder="e.g. 50" />
                        <Input label="Fat (g)" name="fat" type="number" value={meal.fat} onChange={(e) => handleChange(e, "meal")} placeholder="e.g. 10" />
                    </div>
                    <Textarea label="Notes" name="notes" value={meal.notes} onChange={(e) => handleChange(e, "meal")} placeholder="Add any notes about your meal..." />
                </div>

                <div className="text-center mt-6">
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-2 rounded-full font-semibold transition">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MealEntry;