import React from "react";
import { Link } from "react-router-dom";
import { FiSend, FiInfo, FiMail } from "react-icons/fi";

const Navbar = ({ onInfoClick }) => {
	const handleShare = () => {
		const message = encodeURIComponent(
			"Check out the FFCS Timetable Generator! Easily create and manage your course schedule, add teachers and slots, and share your timetables with friends. Visit now to get started! :"
		);
		const url = "https://ffcs-helper.vercel.app";
		const whatsappUrl = `https://api.whatsapp.com/send?text=${message}${url}`;

		window.open(whatsappUrl, "_blank");
	};

	return (
		<nav className="bg-gray-900 p-4 shadow-md relative z-10">
			<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
				<div className="flex justify-between items-center">
					<div
						className="flex-shrink-0 text-lg sm:text-xl md:text-2xl 
                    bg-gradient-to-br from-amber-100 to-yellow-500 bg-clip-text text-transparent"
					>
						<Link to="/" className="flex items-center space-x-2">
							<img
								src="/FFCS_HELPER.png"
								alt="logo"
								className="h-6 w-6 sm:h-8 sm:w-8"
							/>
							<span className="hidden sm:block">FFCS Helper</span>
						</Link>
					</div>
					<div className="flex items-center space-x-2 sm:space-x-4">
						<button
							onClick={onInfoClick}
							className="flex items-center border-2 rounded-full px-2 py-1 sm:px-4 sm:py-2 border-yellow-500 text-xs sm:text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
						>
							<FiInfo className="mr-2" />
							Info
						</button>
						<button
							onClick={handleShare}
							className="flex items-center border-2 rounded-full px-3 py-1 sm:px-6 sm:py-2 border-blue-500 text-xs sm:text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
						>
							<FiSend className="sm:mr-2" />
							<span className="hidden sm:inline-block">Share</span>
						</button>
						<Link
                            to="/contact"
                            className="flex items-center border-2 rounded-full px-3 py-1 sm:px-6 sm:py-2 border-green-500 text-xs sm:text-sm font-medium text-green-500 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <FiMail className="sm:mr-2" />
                            <span className="hidden sm:inline-block">Contact</span> 
                        </Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
