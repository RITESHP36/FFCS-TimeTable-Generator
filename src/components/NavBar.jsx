import React from "react";
import { Link } from "react-router-dom";
import { FiSend, FiInfo } from "react-icons/fi";

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
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center">
					<div className="flex-shrink-0 
					bg-gradient-to-br from-amber-100 to-yellow-500 bg-clip-text text-transparent
					">
						<Link to="/" className=" font-bold text-2xl ">
							<img
								src="/FFCS_HELPER.png"
								alt="logo"
								className="h-8 w-8 inline-block mr-2"
							/>
								FFCS Helper
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<button
							onClick={onInfoClick}
							className="flex items-center border-2 rounded-full px-4 py-2 border-yellow-500 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
						>
							<FiInfo className="mr-2" />
							Info
						</button>
						<button
							onClick={handleShare}
							className="flex items-center border-2 rounded-full px-6 py-2 border-blue-500 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
						>
							<FiSend className="mr-2" />
							Share
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
