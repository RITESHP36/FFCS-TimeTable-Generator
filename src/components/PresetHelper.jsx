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
			"https://ffcs-helper.vercel.app/eyJuYW1lIjoiMjJCQUkiLCJkYXRhIjpbeyJuYW1lIjoiUHJvYmFiaWxpdHkgYW5kIFN0YXRpc3RpY3MiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IlByb2YxIiwic2xvdHMiOiJFMSxURTEsTDM3LEwzOCJ9LHsibmFtZSI6IlByb2YyIiwic2xvdHMiOiJFMSxURTEsTDExLEwxMiJ9LHsibmFtZSI6IlByb2YzIiwic2xvdHMiOiJFMSxURTEsTDQ1LEw0NiJ9LHsibmFtZSI6IlByb2Y0Iiwic2xvdHMiOiJFMixURTIsTDEzLEwxNCJ9LHsibmFtZSI6IlByb2Y1Iiwic2xvdHMiOiJFMixURTIsTDE5LEwyMCJ9LHsibmFtZSI6IlByb2Y2Iiwic2xvdHMiOiJFMixURTIsTDI3LEwyOCJ9XX0seyJuYW1lIjoiQWR2YW5jZWQgQ29tcGV0aXRpdmUgQ29kaW5nLUkiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IkFDQzEiLCJzbG90cyI6IkQxLFREMSJ9LHsibmFtZSI6IkFDQzIiLCJzbG90cyI6IkQyLFREMiJ9XX0seyJuYW1lIjoiQVdTIFNvbHV0aW9ucyBBcmNoaXRlY3QiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IkRyLiBBc2hva2EgUmFqYW4gUiIsInNsb3RzIjoiQjEsVEIxIn0seyJuYW1lIjoiRHIuIFByYWthc2ggUCIsInNsb3RzIjoiQjEsVEIxIn0seyJuYW1lIjoiRHIuIFByYWthc2ggUCIsInNsb3RzIjoiQjIsVEIyIn0seyJuYW1lIjoiRHIuIFRhbWlsYXJhc2kgSyIsInNsb3RzIjoiQjIsVEIyIn1dfSx7Im5hbWUiOiJEZXNpZ24gYW5kIEFuYWx5c2lzIG9mIEFsZ29yaXRobXMiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IkRyLiBTaXZha2FtaSBSIiwic2xvdHMiOiJBMSxUQTEsTDI5LCBMMzAifSx7Im5hbWUiOiJEci4gTGVrc2htaSBLIiwic2xvdHMiOiJBMSxUQTEsTDIzLEwyNCJ9LHsibmFtZSI6IkRyLiBLYXZpcHJpeWEgRyIsInNsb3RzIjoiQTEsVEExLEwzOSxMNDAifSx7Im5hbWUiOiJEci4gU2l2YWthbWkgUiIsInNsb3RzIjoiQTIsVEEyLEw3LEw4In0seyJuYW1lIjoiRHIuIExla3NobWkgSyIsInNsb3RzIjoiQTIsVEEyLEw5LEwxMCJ9LHsibmFtZSI6IkRyLiBLYXZpcHJpeWEgRyIsInNsb3RzIjoiQTIsVEEyLEwzLEw0In1dfSx7Im5hbWUiOiJTb2Z0d2FyZSBFbmdpbmVlcmluZyIsInRlYWNoZXJzIjpbeyJuYW1lIjoiRHIuIFN1Z2FuZXNod2FyaSBHIiwic2xvdHMiOiJHMSxURzEsTDU1LEw1NiJ9LHsibmFtZSI6IkRyLiBSYW1hIFByYWJoYSBLIFAiLCJzbG90cyI6IkcxLFRHMSxMNTcsTDU4In0seyJuYW1lIjoiRHIuIEJyaW5kaGEgUyIsInNsb3RzIjoiRzEsVEcxLEw0NSxMNDYifSx7Im5hbWUiOiJEci4gU3VnYW5lc2h3YXJpIEciLCJzbG90cyI6IkcyLFRHMixMMjMsTDI0In0seyJuYW1lIjoiRHIuIFJhbWEgUHJhYmhhIEsgUCIsInNsb3RzIjoiRzIsVEcyLEwyNyxMMjgifSx7Im5hbWUiOiJEci4gQnJpbmRoYSBTIiwic2xvdHMiOiJHMixURzIsTDExLEwxMiJ9XX0seyJuYW1lIjoiRGVlcCBMZWFybmluZyIsInRlYWNoZXJzIjpbeyJuYW1lIjoiRHIuIFN1YmJ1bGFrc2htaSBUIiwic2xvdHMiOiJGMSxURjEsTDM5LEw0MCJ9LHsibmFtZSI6IkRyLiBQYW5kaXlhcmFqdSBWIiwic2xvdHMiOiJGMSxURjEsTDU1LEw1NiJ9LHsibmFtZSI6IlByb2YuIEtoYWRhciBOYXdhcyBLIiwic2xvdHMiOiJGMSxURjEsTDQ5LEw1MCJ9LHsibmFtZSI6IkRyLiBTdWJidWxha3NobWkgVCIsInNsb3RzIjoiRjIsVEYyLEw5LEwxMCJ9LHsibmFtZSI6IkRyLiBQYW5kaXlhcmFqdSBWIiwic2xvdHMiOiJGMixURjIsTDUsTDYifSx7Im5hbWUiOiJQcm9mLiBLaGFkYXIgTmF3YXMgSyIsInNsb3RzIjoiRjIsVEYyLEwxOSxMMjAifV19XX0=",
		"2022-BPS":
			"https://ffcs-helper.vercel.app/eyJuYW1lIjoiQlBTIiwiZGF0YSI6W3sibmFtZSI6IlByb2JhYmlsaXR5IGFuZCBTdGF0aXN0aWNzIiwidGVhY2hlcnMiOlt7Im5hbWUiOiJQcm9mIDEiLCJzbG90cyI6IkUxLFRFMSxMMjksTDMwIn0seyJuYW1lIjoiUHJvZiAyIiwic2xvdHMiOiJFMixURTIsTDEsTDIifSx7Im5hbWUiOiJQcm9mIDMiLCJzbG90cyI6IkUxLFRFMSxMMzEsTDMyIn1dfSx7Im5hbWUiOiJEZXNpZ24gYW5kIEFuYWx5c2lzIG9mIEFsZ29yaXRobXMiLCJ0ZWFjaGVycyI6W3sibmFtZSI6IlNpdmFyYW1ha3Jpc2huYW4gTiIsInNsb3RzIjoiQTEsVEExLEw1MSxMNTIifSx7Im5hbWUiOiJKZWlwcmF0aGEgIiwic2xvdHMiOiJBMSxUQTEsTDM3LEwzOCJ9LHsibmFtZSI6Ikthdml5YSBFbGFra2l5YSBNIiwic2xvdHMiOiJBMixUQTIsTDE1LEwxNiJ9XX0seyJuYW1lIjoiU29mdHdhcmUgRW5naW5lZXJpbmciLCJ0ZWFjaGVycyI6W3sibmFtZSI6IklsYWtpeWFzZWx2YW4gTiIsInNsb3RzIjoiRzEsVEcxLEw1NyxMNTgifSx7Im5hbWUiOiJJbGFraXlhc2VsdmFuIE4iLCJzbG90cyI6IkcyLFRHMixMMjcsTDI4In0seyJuYW1lIjoiODAwNjgtU0NPUEUgNyIsInNsb3RzIjoiRzEsVEcxLEw0OSxMNTAifV19LHsibmFtZSI6IkNvbnRyb2wgU3lzdGVtcyIsInRlYWNoZXJzIjpbeyJuYW1lIjoiUHJvZiAxIiwic2xvdHMiOiJGMSxURjEsTDU1LEw1NiJ9LHsibmFtZSI6IlByb2YgMiIsInNsb3RzIjoiRjEsVEYxLEwzOSxMNDAifSx7Im5hbWUiOiJQcm9mIDMiLCJzbG90cyI6IkYyLFRGMixMNyxMOCJ9XX0seyJuYW1lIjoiSHVtYW4gQ29tcHV0ZXIgSW50ZXJhY3Rpb24iLCJ0ZWFjaGVycyI6W3sibmFtZSI6IkFydGhpIE0iLCJzbG90cyI6IkMxLFRDMSJ9LHsibmFtZSI6Ik5pdmV0aGl0aGEgViIsInNsb3RzIjoiQzIsVEMyIn1dfSx7Im5hbWUiOiJBZHZhbmNlZCBDb21wZXRpdGl2ZSBDb2RpbmctSSIsInRlYWNoZXJzIjpbeyJuYW1lIjoiQWR2YW5jZWQgQ29tcGV0aXRpdmUgQ29kaW5nLUkiLCJzbG90cyI6IkQxLFREMSJ9LHsibmFtZSI6IkFkdmFuY2VkIENvbXBldGl0aXZlIENvZGluZy1JIiwic2xvdHMiOiJEMixURDIifV19LHsibmFtZSI6IkFXUyIsInRlYWNoZXJzIjpbeyJuYW1lIjoiSyBQcmFkZWVwIiwic2xvdHMiOiJCMSxUQjEifSx7Im5hbWUiOiJLIFByYWRlZXAiLCJzbG90cyI6IkIyLFRCMiJ9LHsibmFtZSI6IlNhbmRvc2ggUyAoQmFsYW5jaW5nKSIsInNsb3RzIjoiQjEsVEIxIn1dfV19",
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
						className="mr-2 p-1 bg-blue-500 text-white rounded inline-block text-sm"
						onClick={() => navigator.clipboard.writeText(preset)}
					>
						<MdOutlineContentCopy className="inline-block" /> Copy Link
					</button>
					<button
						className=" p-1 bg-green-500 text-white rounded inline-block text-sm"
						onClick={() => window.open(preset, "_blank")}
					>
						<FaShareFromSquare className="inline-block" /> Open Link
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
