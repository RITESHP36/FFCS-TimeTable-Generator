import React from "react";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Tutorial = ({ closeModal }) => {
	const handleClose = () => {
		closeModal();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
			<div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
				>
					<ImCross />
				</button>
				<h2 className="text-2xl font-bold mb-4">
					FFCS Timetable Generator Tutorial
				</h2>
				<p className="text-gray-700 mb-4">
					Welcome to the FFCS Timetable Generator! Here you can easily create
					and manage your course schedule. Follow these steps to get started:
				</p>
				<ul className="list-disc list-inside text-gray-700 space-y-2">
					<li>Step 1: Select your courses from the available options.</li>
					<li>
						Step 2: Arrange your timetable by dragging and dropping courses into
						the desired slots.
					</li>
					<li>
						Step 3: Save and share your timetable with friends or print it for
						your convenience.
					</li>
					<li>
						Step 4: Use the "Share" button to send the timetable link to your
						friends via WhatsApp.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Tutorial;
