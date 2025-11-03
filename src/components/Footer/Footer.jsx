import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8 sm:p-10 rounded-t-xl">
            <nav className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-6">
                <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                <Link to="/bmi-calculator" className="hover:text-cyan-400 transition-colors">BMI Calculator</Link>
                <Link to="/user-info" className="hover:text-cyan-400 transition-colors">User Info</Link>
                <Link to="/present-meal" className="hover:text-cyan-400 transition-colors">Present Meal</Link>
                <Link to="/meal-plan" className="hover:text-cyan-400 transition-colors">Meal Plan</Link>
            </nav>

            <nav className="flex justify-center gap-6 mb-6">
                <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="hover:text-red-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="fill-current">
                        <path d="M23.498 6.186a2.998 2.998 0 0 0-2.116-2.12C19.062 3.5 12 3.5 12 3.5s-7.062 0-9.382.566a2.998 2.998 0 0 0-2.116 2.12A31.25 31.25 0 0 0 0 12a31.25 31.25 0 0 0 .502 5.814 2.998 2.998 0 0 0 2.116 2.12C4.938 20.5 12 20.5 12 20.5s7.062 0 9.382-.566a2.998 2.998 0 0 0 2.116-2.12A31.25 31.25 0 0 0 24 12a31.25 31.25 0 0 0-.502-5.814zM9.75 15.02V8.98l6 3.02-6 3.02z" />
                    </svg>
                </a>

                <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-pink-500 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="fill-current">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.415a4.92 4.92 0 011.675 1.093 4.92 4.92 0 011.093 1.675c.175.46.36 1.26.415 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.415 2.43a4.92 4.92 0 01-1.093 1.675 4.92 4.92 0 01-1.675 1.093c-.46.175-1.26.36-2.43.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.415a4.92 4.92 0 01-1.675-1.093 4.92 4.92 0 01-1.093-1.675c-.175-.46-.36-1.26-.415-2.43C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.415-2.43a4.92 4.92 0 011.093-1.675 4.92 4.92 0 011.675-1.093c.46-.175 1.26-.36 2.43-.415C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.77.131 4.659.316 3.73.634a6.918 6.918 0 00-2.5 1.66A6.918 6.918 0 00.634 4.793c-.318.929-.503 2.04-.562 3.322C.013 8.741 0 9.15 0 12c0 2.85.013 3.259.072 4.538.059 1.282.244 2.393.562 3.322a6.918 6.918 0 001.66 2.5 6.918 6.918 0 002.5 1.66c.929.318 2.04.503 3.322.562C8.741 23.987 9.15 24 12 24s3.259-.013 4.538-.072c1.282-.059 2.393-.244 3.322-.562a6.918 6.918 0 002.5-1.66 6.918 6.918 0 001.66-2.5c.318-.929.503-2.04.562-3.322.059-1.279.072-1.688.072-4.538s-.013-3.259-.072-4.538c-.059-1.282-.244-2.393-.562-3.322a6.918 6.918 0 00-1.66-2.5 6.918 6.918 0 00-2.5-1.66c-.929-.318-2.04-.503-3.322-.562C15.259.013 14.85 0 12 0z" />
                        <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z" />
                        <circle cx="18.406" cy="5.594" r="1.44" />
                    </svg>
                </a>

                <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="hover:text-blue-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="fill-current">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                </a>
            </nav>

            <aside className="text-center text-sm text-gray-300">
                <p>© {new Date().getFullYear()} Nutrition Tracker. All rights reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;
