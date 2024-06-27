import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMail } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";

const PresetHelper = () => {
	const [year, setYear] = useState("");
	const [branch, setBranch] = useState("");
	const [preset, setPreset] = useState("");
	const [notfound, setNotFound] = useState(false);

	// Example dictionary of presets
	const presets = {
		// "2021-BRS": "",
		"2022-BAI":
			"https://ffcs-helper.vercel.app/eyJuYW1lIjoiMjJCQUkiLCJkYXRhIjpbeyJuYW1lIjoiUHJvYmFiaWxpdHkgYW5kIFN0YXRpc3RpY3MiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IlByb2YxIiwic2xvdHMiOiJFMSxURTEsTDM3LEwzOCJ9LHsibmFtZSI6IlByb2YyIiwic2xvdHMiOiJFMSxURTEsTDExLEwxMiJ9LHsibmFtZSI6IlByb2YzIiwic2xvdHMiOiJFMSxURTEsTDQ1LEw0NiJ9LHsibmFtZSI6IlByb2Y0Iiwic2xvdHMiOiJFMixURTIsTDEzLEwxNCJ9LHsibmFtZSI6IlByb2Y1Iiwic2xvdHMiOiJFMixURTIsTDE5LEwyMCJ9LHsibmFtZSI6IlByb2Y2Iiwic2xvdHMiOiJFMixURTIsTDI3LEwyOCJ9XX0seyJuYW1lIjoiQWR2YW5jZWQgQ29tcGV0aXRpdmUgQ29kaW5nLUkiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IkFDQzEiLCJzbG90cyI6IkQxLFREMSJ9LHsibmFtZSI6IkFDQzIiLCJzbG90cyI6IkQyLFREMiJ9XX0seyJuYW1lIjoiQVdTIFNvbHV0aW9ucyBBcmNoaXRlY3QiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IkRyLkFzaG9rYSBSYWphbiBSIiwic2xvdHMiOiJCMSxUQjEifSx7Im5hbWUiOiJEci5QcmFrYXNoIFAiLCJzbG90cyI6IkIxLFRCMSJ9LHsibmFtZSI6IkRyLlByYWthc2ggUCIsInNsb3RzIjoiQjIsVEIyIn0seyJuYW1lIjoiRHIuVGFtaWxhcmFzaSBLIiwic2xvdHMiOiJCMixUQjIifV19LHsibmFtZSI6IkRlc2lnbiBhbmQgQW5hbHlzaXMgb2YgQWxnb3JpdGhtcyIsInRlYWNoZXJzIjpbeyJuYW1lIjoiRHIuU2l2YWthbWkgUiIsInNsb3RzIjoiQTEsVEExLEwyOSwgTDMwIn0seyJuYW1lIjoiRHIuTGVrc2htaSBLIiwic2xvdHMiOiJBMSxUQTEsTDIzLEwyNCJ9LHsibmFtZSI6IkRyLkthdmlwcml5YSBHIiwic2xvdHMiOiJBMSxUQTEsTDM5LEw0MCJ9LHsibmFtZSI6IkRyLlNpdmFrYW1pIFIiLCJzbG90cyI6IkEyLFRBMixMNyxMOCJ9LHsibmFtZSI6IkRyLkxla3NobWkgSyIsInNsb3RzIjoiQTIsVEEyLEw5LEwxMCJ9LHsibmFtZSI6IkRyLkthdmlwcml5YSBHIiwic2xvdHMiOiJBMixUQTIsTDMsTDQifV19LHsibmFtZSI6IlNvZnR3YXJlIEVuZ2luZWVyaW5nIiwidGVhY2hlcnMiOlt7Im5hbWUiOiJEci5TdWdhbmVzaHdhcmkgRyIsInNsb3RzIjoiRzEsVEcxLEw1NSxMNTYifSx7Im5hbWUiOiJEci5SYW1hIFByYWJoYSBLIFAiLCJzbG90cyI6IkcxLFRHMSxMNTcsTDU4In0seyJuYW1lIjoiRHIuQnJpbmRoYSBTIiwic2xvdHMiOiJHMSxURzEsTDQ1LEw0NiJ9LHsibmFtZSI6IkRyLlN1Z2FuZXNod2FyaSBHIiwic2xvdHMiOiJHMixURzIsTDIzLEwyNCJ9LHsibmFtZSI6IkRyLlJhbWEgUHJhYmhhIEsgUCIsInNsb3RzIjoiRzIsVEcyLEwyNyxMMjgifSx7Im5hbWUiOiJEci5CcmluZGhhIFMiLCJzbG90cyI6IkcyLFRHMixMMTEsTDEyIn1dfSx7Im5hbWUiOiJEZWVwIExlYXJuaW5nIiwidGVhY2hlcnMiOlt7Im5hbWUiOiJEci4gU3ViYnVsYWtzaG1pIFQiLCJzbG90cyI6IkYxLFRGMSxMMzksTDQwIn0seyJuYW1lIjoiRHIuIFBhbmRpeWFyYWp1IFYiLCJzbG90cyI6IkYxLFRGMSxMNTUsTDU2In0seyJuYW1lIjoiUHJvZi4gS2hhZGFyIE5hd2FzIEsiLCJzbG90cyI6IkYxLFRGMSxMNDksTDUwIn0seyJuYW1lIjoiRHIuIFN1YmJ1bGFrc2htaSBUIiwic2xvdHMiOiJGMixURjIsTDksTDEwIn0seyJuYW1lIjoiRHIuIFBhbmRpeWFyYWp1IFYiLCJzbG90cyI6IkYyLFRGMixMNSxMNiJ9LHsibmFtZSI6IlByb2YuIEtoYWRhciBOYXdhcyBLIiwic2xvdHMiOiJGMixURjIsTDE5LEwyMCJ9XX1dfQ==",
		// Add more presets as needed
	};

	const years = ["2021", "2022", "2023"];
	const branches = ["BCE", "BAI", "BRS", "BPS", "BEC"];

	const handleSubmit = (e) => {
		e.preventDefault();

		// return if year of branch is empty
		if (!year || !branch) {
			toast.error("Please select a year and branch.", {
				position: "top-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			return;
		}

		const key = `${year}-${branch}`;
		// console.log('Selected key:', key); // Debug log

		if (presets[key]) {
			setNotFound(false);
			setPreset(presets[key]);
			// console.log('Preset found:', presets[key]); // Debug log
		} else {
			setNotFound(true);
		}
	};

	return (
		<div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto w-full max-w-md">
			<h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
				Teacher List Presets
			</h3>
			<div className="flex justify-center items-center">
				<p className="border-2 border-yellow-500 rounded-full p-2 sm:px-4 md:px-6 mb-4 text-xs sm:text-sm text-center flex items-center gap-2 sm:gap-4 bg-yellow-100 font-medium text-yellow-700">
					<span>
						Select your batch year and branch to quickly populate your teacher
						list with a preset.
					</span>
				</p>
			</div>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
					<select
						id="year"
						value={year}
						onChange={(e) => setYear(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Select Year</option>
						{years.map((y) => (
							<option key={y} value={y}>
								{y}
							</option>
						))}
					</select>
					<select
						id="branch"
						value={branch}
						onChange={(e) => setBranch(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
					>
						<option value="">Select Branch</option>
						{branches.map((b) => (
							<option key={b} value={b}>
								{b}
							</option>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base sm:text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
				>
					Find Preset
				</button>
			</form>
			{!notfound && preset && (
				<div className="mt-6 p-4 bg-gray-100 rounded-md">
					<h4 className="text-base sm:text-lg font-semibold mb-2">
						Preset Code Found: {year}-{branch}
					</h4>
					<p className="text-sm sm:text-base break-words mb-4">
						{preset.length > 30 ? `${preset.slice(0, 30)}...` : preset}
					</p>
					<button
						className="mr-2 p-2 bg-blue-500 text-white rounded"
						onClick={() => navigator.clipboard.writeText(preset)}
					>
						<MdOutlineContentCopy 
                        className="inline-block"
                        /> Copy Link
					</button>
					<button
						className="ml-2 p-2 bg-green-500 text-white rounded "
						onClick={() => window.open(preset, "_blank")}
					>
						<FaShareFromSquare
                        className="inline-block"
                        /> Open Link
					</button>
				</div>
			)}
			{notfound && (
				<div className="mt-6 p-4 bg-gray-100 rounded-md">
					<h4 className="text-lg sm:text-xl font-semibold mb-2">
						Preset Not Found:
					</h4>
					<p className="mt-2 font-medium text-amber-600 text-base sm:text-lg">
						Coming soon, but if you have made one, share with us at{" "}
						<IoMail
							className="inline-block text-blue-500 text-xl sm:text-2xl cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
							onClick={() => {
								window.open("mailto:riteshpradhan7854@gmail.com");
							}}
						/>
						. It can be helpful for others.
					</p>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};

export default PresetHelper;
