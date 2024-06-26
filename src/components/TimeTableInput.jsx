import React, { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

import { generateTimetables } from "./timetableGenerator";

const encodePreset = (preset) => {
	return btoa(JSON.stringify(preset));
};

const decodePreset = (code) => {
	try {
		return JSON.parse(atob(code));
	} catch (error) {
		console.error("Invalid preset code");
		return null;
	}
};

const TimetableInput = ({ alldata, updateAlldata }) => {
	const [subjectCount, setSubjectCount] = useState(1);
	const [subjects, setSubjects] = useState([
		{ name: "", teachers: [{ name: "", slots: "" }] },
	]);
	const [timetables, setTimetables] = useState([]);
	const [presets, setPresets] = useState([]);
	const [selectedPreset, setSelectedPreset] = useState(null);
	const [presetName, setPresetName] = useState("");
	const [presetCode, setPresetCode] = useState("");
	const [codeGenerated, setCodeGenerated] = useState(false);
	const [tooltipText, setTooltipText] = useState("Copy");
	const [isHovered, setIsHovered] = useState(false);
	const [check, setCheck] = useState(false);

	useEffect(() => {
		const savedPresets =
			JSON.parse(localStorage.getItem("timetablePresets")) || [];
		setPresets(savedPresets);
	}, []);

	useEffect(() => {
		const segments = window.location.href.split("/");
		const presetCodeURL = decodeURIComponent(segments[segments.length - 1]);
		console.log("Preset code from URL:", presetCodeURL);
		if (presetCodeURL.length > 0) {
			setPresetCode(presetCodeURL); // Set the preset code state
			setCheck(true);
		}
	}, []); // Empty dependency array ensures this runs only once on mount

	useEffect(() => {
		if (check) {
			loadPresetFromCode();
		}
	}, [check]);

	const handleSubjectCountChange = (e) => {
		const count = parseInt(e.target.value);
		setSubjectCount(count);
		setSubjects(
			Array(count)
				.fill()
				.map(
					(_, index) =>
						subjects[index] || { name: "", teachers: [{ name: "", slots: "" }] }
				)
		);
	};

	const handleSubjectNameChange = (subjectIndex, value) => {
		const newSubjects = [...subjects];
		newSubjects[subjectIndex].name = value;
		setSubjects(newSubjects);
	};

	const handleTeacherChange = (subjectIndex, teacherIndex, field, value) => {
		const newSubjects = [...subjects];
		newSubjects[subjectIndex].teachers[teacherIndex][field] = value;
		setSubjects(newSubjects);
	};

	const addTeacher = (subjectIndex) => {
		const newSubjects = [...subjects];
		newSubjects[subjectIndex].teachers.push({ name: "", slots: "" });
		setSubjects(newSubjects);
	};

	const removeTeacher = (subjectIndex, teacherIndex) => {
		const newSubjects = [...subjects];
		newSubjects[subjectIndex].teachers.splice(teacherIndex, 1);
		setSubjects(newSubjects);
	};

	const removeSubject = (subjectIndex) => {
		const newSubjects = subjects.filter((_, index) => index !== subjectIndex);
		setSubjects(newSubjects);
		setSubjectCount(subjectCount - 1);
	};

	const generateTimetable = () => {
		if (subjects.some((subject) => subject.teachers.length === 0)) {
			alert(
				"Please fill in data for all subjects before generating the timetable."
			);
			return;
		}

		const initial = subjects.map((subject) => {
			const subjectObj = {};
			subject.teachers.forEach((teacher) => {
				if (teacher.name && teacher.slots) {
					subjectObj[teacher.name] = teacher.slots
						.split(",")
						.map((slot) => slot.trim());
				}
			});
			return [subjectObj];
		});

		if (initial.some((subject) => Object.keys(subject[0]).length === 0)) {
			alert("Please ensure all subjects have at least one teacher with slots.");
			return;
		}

		console.log(JSON.stringify(initial, null, 2)); // Log the initial array
		console.log(initial);
		const result = generateTimetables(initial);
		setTimetables(result);
		updateAlldata(result);
	};

	const savePreset = () => {
		if (!presetName) {
			alert("Please enter a name for the preset.");
			return;
		}
		const newPreset = { name: presetName, data: subjects };
		const updatedPresets = [...presets, newPreset];
		setPresets(updatedPresets);
		localStorage.setItem("timetablePresets", JSON.stringify(updatedPresets));
		setPresetName("");
		alert("Preset saved successfully!");
	};

	const loadPreset = (preset) => {
		setSelectedPreset(preset);
		setSubjects(preset.data);
		setSubjectCount(preset.data.length);
	};

	const updatePreset = () => {
		if (!selectedPreset) {
			alert("Please select a preset to update.");
			return;
		}
		const updatedPresets = presets.map((p) =>
			p.name === selectedPreset.name ? { ...p, data: subjects } : p
		);
		setPresets(updatedPresets);
		localStorage.setItem("timetablePresets", JSON.stringify(updatedPresets));
		alert("Preset updated successfully!");
	};

	const generatePresetCode = () => {
		if (!selectedPreset) {
			alert("Please select a preset first.");
			return;
		}
		const code = encodePreset(selectedPreset);
		setPresetCode(code);
		setCodeGenerated(true);
	};

	const loadPresetFromCode = () => {
		const preset = decodePreset(presetCode);
		if (preset) {
			loadPreset(preset);
			setPresetCode("");
		} else {
			alert("Invalid preset code. Please check and try again.");
		}
	};

	const handleCopyClick = () => {
		navigator.clipboard.writeText(presetCode);
		setTooltipText("Copied");
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className="min-h-screen bg-gray-100 py-10">
			<div className="max-w-4xl mx-auto px-5">
				<h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
					Timetable Generator
				</h1>
				<div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
					{/* Preset selection and management */}
					<div className="mb-6 flex justify-between items-center">
						<div className="w-1/2 pr-2">
							<label
								className="block text-gray-700 text-md font-semibold mb-2"
								htmlFor="preset-select"
							>
								Select Preset:
							</label>
							<select
								id="preset-select"
								className="w-full border border-gray-300 shadow-md rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								onChange={(e) => loadPreset(presets[e.target.value])}
							>
								<option value="">Select a preset</option>
								{presets.map((preset, index) => (
									<option key={index} value={index}>
										{preset.name}
									</option>
								))}
							</select>
						</div>
						<div className="w-1/2 pl-2">
							<label
								className="block text-gray-700 text-md font-semibold mb-2"
								htmlFor="preset-name"
							>
								Preset Name:
							</label>
							<input
								id="preset-name"
								className="w-full shadow-md rounded-xl appearance-none border border-gray-300 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								value={presetName}
								onChange={(e) => setPresetName(e.target.value)}
								placeholder="Enter preset name"
							/>
						</div>
					</div>
					<div className="mb-6 flex justify-between">
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
							onClick={savePreset}
						>
							Save as New Preset
						</button>
						<button
							className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
							onClick={updatePreset}
						>
							Update Selected Preset
						</button>
					</div>

					{/* Unique code generator */}
					<div className="mb-6">
						<h2 className="text-2xl font-bold mb-4 text-gray-800">
							Preset Code
						</h2>
						<div className="flex items-center">
							<input
								className="flex-grow shadow appearance-none border border-gray-300 rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
								type="text"
								placeholder="Enter preset code"
								value={presetCode}
								onChange={(e) => setPresetCode(e.target.value)}
							/>
							{codeGenerated && (
								<div className="relative flex items-center">
									<FontAwesomeIcon
										icon={faCopy}
										className="text-gray-600 h-6 hover:text-gray-700 cursor-pointer mr-4 ml-2 "
										onClick={handleCopyClick}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									/>
									{isHovered && (
										<div className="absolute bottom-full mb-2 text-sm bg-gray-800 text-white rounded py-1 px-2">
											{tooltipText}
										</div>
									)}
								</div>
							)}
							<button
								className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline mr-2"
								onClick={generatePresetCode}
							>
								Generate Code
							</button>
							<button
								className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline mr-2"
								onClick={loadPresetFromCode}
							>
								Load from Code
							</button>
						</div>
					</div>

					{/* Subject count input */}
					<div className="mb-6">
						<label
							className="block text-gray-700 text-md font-semibold mb-2"
							htmlFor="number-of-subjects"
						>
							Number of Subjects:
						</label>
						<div className="flex items-center">
							<input
								className="w-full appearance-none shadow-md border border-gray-300 rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="number-of-subjects"
								type="number"
								min="1"
								value={subjectCount}
								onChange={handleSubjectCountChange}
							/>
							<button
								className="ml-2 text-white bg-red-500 hover:bg-red-700 font-bold text-xl rounded-xl px-3 py-1"
								onClick={() =>
									setSubjectCount((prevCount) => Math.max(1, prevCount - 1))
								}
							>
								-
							</button>
							<button
								className="ml-2 text-white bg-blue-500 hover:bg-blue-700 font-bold text-xl rounded-xl px-3 py-1"
								onClick={() => setSubjectCount((prevCount) => prevCount + 1)}
							>
								+
							</button>
						</div>
					</div>

					{/* Subjects and teachers inputs */}
					{subjects.map((subject, subjectIndex) => (
						<div
							key={subjectIndex}
							className="mb-8 p-6 bg-gray-50 border-4 border-gray-200 rounded-2xl shadow-md"
						>
							<div className="flex justify-between items-center mb-4">
								<input
									className="text-xl font-semibold bg-gray-200 border border-gray-300 rounded-xl py-2 px-3 flex-grow mr-4"
									type="text"
									placeholder={`Subject ${subjectIndex + 1}`}
									value={subject.name}
									onChange={(e) =>
										handleSubjectNameChange(subjectIndex, e.target.value)
									}
								/>
								{/* <button
							className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
							onClick={() => removeSubject(subjectIndex)}
							>
							Remove Subject
							</button> */}
								<button
									className="text-red-600 hover:bg-red-500 hover:text-white font-semibold rounded-full focus:outline-none focus:shadow-outline p-0.5 duration-200 "
									onClick={() => removeSubject(subjectIndex)}
								>
									<MdDeleteOutline
										className="inline-block align-middle"
										size={32}
									/>
								</button>
							</div>
							{subject.teachers.map((teacher, teacherIndex) => (
								<div key={teacherIndex} className="mb-4 flex items-center">
									<input
										className="flex-grow shadow appearance-none border border-gray-300 rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
										type="text"
										placeholder="Teacher Name"
										value={teacher.name}
										onChange={(e) =>
											handleTeacherChange(
												subjectIndex,
												teacherIndex,
												"name",
												e.target.value
											)
										}
									/>
									<input
										className="flex-grow shadow appearance-none border border-gray-300 rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
										type="text"
										placeholder="Slots (comma-separated)"
										value={teacher.slots}
										onChange={(e) =>
											handleTeacherChange(
												subjectIndex,
												teacherIndex,
												"slots",
												e.target.value
											)
										}
									/>

									{/* deleting the teacher */}
									<button
										className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full focus:outline-none focus:shadow-outline"
										onClick={() => removeTeacher(subjectIndex, teacherIndex)}
									>
										<MdOutlineRemoveCircleOutline
											className="inline-block align-middle"
											size={32}
										/>
									</button>
								</div>
							))}
							<button
								className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
								onClick={() => addTeacher(subjectIndex)}
							>
								Add Teacher
							</button>
						</div>
					))}

					{/* Generate timetable button */}
					<button
						className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline"
						onClick={generateTimetable}
					>
						Generate Timetable
					</button>
				</div>
			</div>
		</div>
	);
};

export default TimetableInput;
