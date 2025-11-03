import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
        if (type === "user") setUserData((prev) => ({ ...prev, [name]: value }));
        else setMeal((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const { height, weight } = userData;
        if (height && weight) {
            const heightM = height / 100;
            setBmi((weight / (heightM * heightM)).toFixed(1));
        } else setBmi(null);
    }, [userData.height, userData.weight]);

    useEffect(() => {
        const { gender, weight, height, birthdate, goal, activity } = userData;
        if (gender && weight && height && birthdate && goal && activity) {
            const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
            let bmr = gender === "male"
                ? 10 * weight + 6.25 * height - 5 * age + 5
                : 10 * weight + 6.25 * height - 5 * age - 161;

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

    const Input = ({ label, name, value, type = "text", onChange }) => (
        <div>
            <label className="block mb-1 font-medium text-white">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full bg-black text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
        </div>
    );

    const Select = ({ label, name, value, onChange, options }) => (
        <div>
            <label className="block mb-1 font-medium text-white">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full bg-black text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );

    const Textarea = ({ label, name, value, onChange }) => (
        <div>
            <label className="block mb-1 font-medium text-white">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                required
                rows={3}
                className="w-full bg-black text-white border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
        </div>
    );

    return (
        <div className="max-w-4xl bg-linear-to-b mx-auto mb-8 p-6 rounded-lg mt-8 shadow-lg">
            <h2 style={{ fontFamily: "Rancho, cursive" }} className="text-4xl font-semibold mb-6 text-center text-cyan-400">
                Nutrition Tracker
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* User Info Card */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
                    <h3 className="text-xl font-medium text-cyan-400">User Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Name" name="name" value={userData.name} onChange={(e) => handleChange(e, "user")} />
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
                        <Input label="Height (cm)" name="height" type="number" value={userData.height} onChange={(e) => handleChange(e, "user")} />
                        <Input label="Weight (kg)" name="weight" type="number" value={userData.weight} onChange={(e) => handleChange(e, "user")} />
                        <Input label="Birthdate" name="birthdate" type="date" value={userData.birthdate} onChange={(e) => handleChange(e, "user")} />
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

                    <div className="flex flex-col sm:flex-row gap-4 mt-2 text-white">
                        {bmi && <div className="bg-cyan-600 text-black px-4 py-2 rounded-md font-semibold">BMI: {bmi}</div>}
                        {calorieGoal && <div className="bg-cyan-600 text-black px-4 py-2 rounded-md font-semibold">Daily Calorie Goal: {calorieGoal} kcal</div>}
                    </div>
                </div>

                {/* Meal Info Card */}
                <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
                    <h3 className="text-xl font-medium text-cyan-400">Meal Info</h3>
                    <div className="space-y-4">
                        <Input label="Meal Name" name="name" value={meal.name} onChange={(e) => handleChange(e, "meal")} />
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <Input label="Calories" name="calories" type="number" value={meal.calories} onChange={(e) => handleChange(e, "meal")} />
                            <Input label="Protein (g)" name="protein" type="number" value={meal.protein} onChange={(e) => handleChange(e, "meal")} />
                            <Input label="Carbs (g)" name="carbs" type="number" value={meal.carbs} onChange={(e) => handleChange(e, "meal")} />
                            <Input label="Fat (g)" name="fat" type="number" value={meal.fat} onChange={(e) => handleChange(e, "meal")} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input label="Date" name="date" type="date" value={meal.date} onChange={(e) => handleChange(e, "meal")} />
                            <Input label="Time" name="time" type="time" value={meal.time} onChange={(e) => handleChange(e, "meal")} />
                        </div>
                        <Textarea label="Notes" name="notes" value={meal.notes} onChange={(e) => handleChange(e, "meal")} />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full font-semibold transition">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default MealEntry;
