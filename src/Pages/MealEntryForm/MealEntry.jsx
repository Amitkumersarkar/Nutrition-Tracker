import { useState, useEffect } from "react";

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

    // Handle user data change
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle meal data change
    const handleMealChange = (e) => {
        const { name, value } = e.target;
        setMeal((prev) => ({ ...prev, [name]: value }));
    };

    // Calculate BMI
    useEffect(() => {
        const { height, weight } = userData;
        if (height && weight) {
            const heightM = height / 100;
            const bmiValue = (weight / (heightM * heightM)).toFixed(1);
            setBmi(bmiValue);
        } else {
            setBmi(null);
        }
    }, [userData.height, userData.weight]);

    // Calculate daily calorie goal
    useEffect(() => {
        const { gender, weight, height, birthdate, goal, activity } = userData;
        if (gender && weight && height && birthdate && goal && activity) {
            const age = new Date().getFullYear() - new Date(birthdate).getFullYear();
            let bmr = 0;
            if (gender === "male") bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            else if (gender === "female") bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            else bmr = 10 * weight + 6.25 * height - 5 * age;

            let activityMultiplier = 1.2;
            switch (activity) {
                case "sedentary": activityMultiplier = 1.2; break;
                case "light": activityMultiplier = 1.375; break;
                case "moderate": activityMultiplier = 1.55; break;
                case "active": activityMultiplier = 1.725; break;
                case "very": activityMultiplier = 1.9; break;
            }

            let calories = bmr * activityMultiplier;
            if (goal === "lose") calories -= 500;
            else if (goal === "gain") calories += 500;

            setCalorieGoal(Math.round(calories));
        } else setCalorieGoal(null);
    }, [userData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Data:", userData);
        console.log("Meal Data:", meal);
        alert("Meal & user info submitted!");
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
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-black shadow-md rounded-lg mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-600">
                Nutrition Tracker
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* User Info */}
                <div>
                    <h3 className="text-xl font-medium mb-3 text-cyan-600">User Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {inputField("Name", "name", userData.name, handleUserChange)}
                        {selectField("Gender", "gender", userData.gender, handleUserChange, [
                            { label: "Select Gender", value: "" },
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                            { label: "Other", value: "other" },
                        ])}
                        {inputField("Height (cm)", "height", userData.height, handleUserChange, "number")}
                        {inputField("Weight (kg)", "weight", userData.weight, handleUserChange, "number")}
                        {inputField("Birthdate", "birthdate", userData.birthdate, handleUserChange, "date")}
                        {selectField("Goal", "goal", userData.goal, handleUserChange, [
                            { label: "Select Goal", value: "" },
                            { label: "Lose Weight", value: "lose" },
                            { label: "Maintain Weight", value: "maintain" },
                            { label: "Gain Weight", value: "gain" },
                        ])}
                        {selectField("Activity Level", "activity", userData.activity, handleUserChange, [
                            { label: "Select Activity", value: "" },
                            { label: "Sedentary", value: "sedentary" },
                            { label: "Lightly Active", value: "light" },
                            { label: "Moderately Active", value: "moderate" },
                            { label: "Active", value: "active" },
                            { label: "Very Active", value: "very" },
                        ])}
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        {bmi && <div className="p-3 bg-cyan-50 rounded-md text-cyan-700 font-semibold">BMI: {bmi}</div>}
                        {calorieGoal && <div className="p-3 bg-cyan-50 rounded-md text-cyan-700 font-semibold">Daily Calorie Goal: {calorieGoal} kcal</div>}
                    </div>
                </div>

                {/* Meal Info */}
                <div>
                    <h3 className="text-xl font-medium mb-3 text-cyan-600">Meal Info</h3>
                    <div className="space-y-4">
                        {inputField("Meal Name", "name", meal.name, handleMealChange)}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            {inputField("Calories", "calories", meal.calories, handleMealChange, "number")}
                            {inputField("Protein (g)", "protein", meal.protein, handleMealChange, "number")}
                            {inputField("Carbs (g)", "carbs", meal.carbs, handleMealChange, "number")}
                            {inputField("Fat (g)", "fat", meal.fat, handleMealChange, "number")}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {inputField("Date", "date", meal.date, handleMealChange, "date")}
                            {inputField("Time", "time", meal.time, handleMealChange, "time")}
                        </div>
                        {textareaField("Notes", "notes", meal.notes, handleMealChange)}
                    </div>
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full font-semibold transition">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

// Reusable components
const inputField = (label, name, value, onChange, type = "text") => (
    <div>
        <label className="block mb-1 font-medium">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
    </div>
);

const selectField = (label, name, value, onChange, options) => (
    <div>
        <label className="block mb-1 font-medium">{label}</label>
        <select name={name} value={value} onChange={onChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400">
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

const textareaField = (label, name, value, onChange) => (
    <div>
        <label className="block mb-1 font-medium">{label}</label>
        <textarea name={name} value={value} onChange={onChange} rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
    </div>
);

export default MealEntry;
