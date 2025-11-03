const PresentMeal = () => {
    const meals = [
        {
            title: "Breakfast 1",
            foods: [
                { name: "Chicken", amount: "150g" },
                { name: "Rice", amount: "350g" },
                { name: "Fish", amount: "200g" },
            ],
            nutrition: {
                Protein: "150g",
                Carbs: "350g",
                Fat: "90g",
                Fiber: "15g",
                Sugar: "30g",
            },
            total: "2000 kcal",
        },
        {
            title: "Lunch",
            foods: [
                { name: "Egg", amount: "100g" },
                { name: "Rice", amount: "250g" },
                { name: "Vegetables", amount: "100g" },
            ],
            nutrition: {
                Protein: "120g",
                Carbs: "280g",
                Fat: "80g",
                Fiber: "10g",
                Sugar: "25g",
            },
            total: "1800 kcal",
        },
        {
            title: "Dinner",
            foods: [
                { name: "Fish", amount: "150g" },
                { name: "Rice", amount: "200g" },
                { name: "Salad", amount: "100g" },
            ],
            nutrition: {
                Protein: "100g",
                Carbs: "200g",
                Fat: "70g",
                Fiber: "8g",
                Sugar: "20g",
            },
            total: "1600 kcal",
        },
        {
            title: "Snack",
            foods: [
                { name: "Almonds", amount: "50g" },
                { name: "Apple", amount: "1 pc" },
            ],
            nutrition: {
                Protein: "40g",
                Carbs: "100g",
                Fat: "50g",
                Fiber: "6g",
                Sugar: "15g",
            },
            total: "900 kcal",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-5 md:px-10">
            <h1 style={{ fontFamily: "Rancho, cursive" }} className="text-5xl font-bold text-cyan-400 text-center mb-10">Present Meals 🍽️</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {meals.map((meal, i) => (
                    <div
                        key={i}
                        className="bg-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-transform"
                    >
                        {/* Meal Title */}
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            {meal.title}
                        </h2>

                        {/* Food List */}
                        <div className="space-y-1 mb-4">
                            {meal.foods.map((food, j) => (
                                <div
                                    key={j}
                                    className="flex justify-between text-sm border-b border-gray-700 pb-1"
                                >
                                    <span>{food.name}</span>
                                    <span className="text-gray-300">{food.amount}</span>
                                </div>
                            ))}
                        </div>

                        {/* Nutrition */}
                        <div className="bg-gray-900 rounded-lg p-3 text-sm mb-4">
                            {Object.entries(meal.nutrition).map(([key, value], idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between text-gray-300 border-b border-gray-800 last:border-0 pb-1"
                                >
                                    <span>{key}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                            <div className="flex justify-between mt-2 font-semibold text-green-400">
                                <span>Total Cal</span>
                                <span>{meal.total}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2">
                            <button className="bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition">
                                Log Meal
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PresentMeal;
