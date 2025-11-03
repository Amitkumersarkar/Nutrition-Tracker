import { useState } from "react";

const MealPlan = () => {
    const [mealItems, setMealItems] = useState([
        { id: 1, name: "Chicken Breast", weight: 150 },
        { id: 2, name: "Rice", weight: 200 },
        { id: 3, name: "Broccoli", weight: 100 },
    ]);

    // Handle changing weight input
    const handleWeightChange = (id, newWeight) => {
        setMealItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, weight: Number(newWeight) } : item
            )
        );
    };

    // Add a new meal item
    const handleAddItem = () => {
        setMealItems((prev) => [
            ...prev,
            { id: Date.now(), name: "New Item", weight: 0 },
        ]);
    };

    // Remove a meal item
    const handleRemoveItem = (id) => {
        setMealItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Reset all items
    const handleReset = () => {
        setMealItems([]);
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-linear-to-b from-gray-900 to-gray-900 m-20 text-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
                🥗 Custom Meal Plan
            </h2>

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 mb-3 font-semibold border-b border-gray-700 pb-2">
                <span>Item</span>
                <span>Weight</span>
                <span>Unit</span>
            </div>

            {mealItems.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center mb-2 bg-gray-800 rounded-lg p-2 transition hover:bg-gray-700"
                >
                    <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                            setMealItems((prev) =>
                                prev.map((i) =>
                                    i.id === item.id ? { ...i, name: e.target.value } : i
                                )
                            )
                        }
                        className="bg-transparent border-b border-gray-600 focus:border-green-400 outline-none px-1"
                    />

                    <input
                        type="number"
                        value={item.weight}
                        onChange={(e) => handleWeightChange(item.id, e.target.value)}
                        className="bg-transparent text-center border-b border-gray-600 focus:border-green-400 outline-none w-full"
                    />

                    <span>g</span>
                    <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-500 text-center"
                    >
                        ✖
                    </button>
                </div>
            ))}

            <div className="flex gap-3 mt-5">
                <button
                    onClick={handleAddItem}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded-lg"
                >
                    ➕ Add Item
                </button>
                <button
                    onClick={handleReset}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg"
                >
                    Reset
                </button>
            </div>

            <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-lg">
                    💾 Save Preset
                </button>
                <button className="flex-1 bg-blue-400 hover:bg-blue-500 text-black font-bold py-2 rounded-lg">
                    ✅ Log Meal
                </button>
            </div>
        </div>
    );
};

export default MealPlan;
