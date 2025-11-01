import Lottie from "lottie-react";
import errorLottieAnimation from "../../public/assets/Lottie/Lonely 404.json";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-6 py-16">

            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <Lottie
                    animationData={errorLottieAnimation}
                    loop={true}
                    className="w-full h-auto"
                />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mt-8">
                Oops! Page Not Found 😢
            </h1>

            <p className="text-gray-400 mt-5 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto leading-relaxed">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            <NavLink
                to="/"
                className="btn btn-primary mt-8 px-6 py-3 text-sm sm:text-base w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
                Go Back Home
            </NavLink>
        </div>
    );
};

export default ErrorPage;
