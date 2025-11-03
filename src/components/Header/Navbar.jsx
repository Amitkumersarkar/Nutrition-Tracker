import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/assets/logo/N.png";

const Navbar = () => {
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-cyan-600 font-semibold" : "hover:text-cyan-500"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/bmi-calculator"
                    className={({ isActive }) =>
                        isActive ? "text-cyan-600 font-semibold" : "hover:text-cyan-500"
                    }
                >
                    BMI Calculator
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/user-info"
                    className={({ isActive }) =>
                        isActive ? "text-cyan-600 font-semibold" : "hover:text-cyan-500"
                    }
                >
                    User Info
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/present-meal"
                    className={({ isActive }) =>
                        isActive ? "text-cyan-600 font-semibold" : "hover:text-cyan-500"
                    }
                >
                    Present Meal
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/meal-plan"
                    className={({ isActive }) =>
                        isActive ? "text-cyan-600 font-semibold" : "hover:text-cyan-500"
                    }
                >
                    Meal Plan
                </NavLink>
            </li>
        </>
    );

    return (
        <>
            <div className="sticky top-0 z-50 bg-gray-400/50 backdrop-blur-lg shadow-md">
                <div className="navbar max-w-7xl mx-auto px-4 py-2">
                    <div className="navbar-start flex items-center">
                        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
                            <img
                                src={logo}
                                alt="Nutrition Track Logo"
                                className="h-10 sm:h-12 object-contain"
                            />
                        </Link>

                        <div className="dropdown lg:hidden ml-3">
                            <label tabIndex={0} className="btn btn-ghost p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-600 rounded-xl mt-3 w-52 p-2 shadow-md border border-gray-100"
                            >
                                {navLinks}
                            </ul>
                        </div>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-3">{navLinks}</ul>
                    </div>

                    <div className="navbar-end">
                        <Link
                            to="/profile"
                            className="btn btn-primary rounded-full px-5 text-sm sm:text-base hover:bg-cyan-700 transition"
                        >
                            SingIn
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
