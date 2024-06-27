import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for routing

const ErrorBoundaryTT = () => {
	return (
		<main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <p className="text-white text-xl mt-5 font-semibold">
				The page you are looking for does not exist.
			</p>
            <p className="text-gray-400 text-xl font-medium">
                The timetable link might be corrupted or does not exist.
            </p>
			<h1 className="text-9xl font-extrabold text-white tracking-widest ">
				404
			</h1>
			<div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
				Page Not Found
			</div>
			
			<button className="mt-5">
            
				<Link
					to="/"
					className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring "
				>
					<span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>
					<span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
						Go Home
					</span>
				</Link>
                
			</button>
		</main>
	);
};

export default ErrorBoundaryTT;
