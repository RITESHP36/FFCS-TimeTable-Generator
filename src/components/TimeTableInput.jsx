import React, { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoRocket } from "react-icons/io5";
import { IoSparklesSharp } from "react-icons/io5";
import {
	IoMdArrowUp,
	IoMdArrowDown,
	IoMdInformationCircle,
} from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";

import { generateTimetables } from "./timetableGenerator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SlotSelector from "./SlotSelector";
import PresetHelper from "./PresetHelper";
import SubjectSearchInput from "./SubjectSearchInput";

import { coursename_code } from "../data/coursename_code";
import { course_name_teacher_list } from "../data/course_name_teacher_list";

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
	const [presets, setPresets] = useState([]);
	const [selectedPreset, setSelectedPreset] = useState(null);
	const [presetName, setPresetName] = useState("");
	const [presetCode, setPresetCode] = useState("");
	const [codeGenerated, setCodeGenerated] = useState(false);
	const [check, setCheck] = useState(false);
	const navigate = useNavigate();
	const [showEror, setShowError] = useState(false);
	const [showPresetSettings, setShowPresetSettings] = useState(false);

	useEffect(() => {
		const savedPresets =
			JSON.parse(localStorage.getItem("timetablePresets")) || [];
		setPresets(savedPresets);
	}, []);

	useEffect(() => {
		const segments = window.location.href.split("/");
		const presetCodeURL = decodeURIComponent(segments[segments.length - 1]);
		// console.log("Preset code from URL:", presetCodeURL);
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

		// Check if the subject exists in course_name_teacher_list
		if (course_name_teacher_list[value]) {
			// If it exists, replace the teachers array with the data from course_name_teacher_list
			newSubjects[subjectIndex].teachers = course_name_teacher_list[value].map(
				(teacherObj) => {
					const teacherName = Object.keys(teacherObj)[0];
					const slots = teacherObj[teacherName];
					return { name: teacherName, slots: slots };
				}
			);
		} else {
			// If it doesn't exist, reset the teachers array to a single empty teacher
			newSubjects[subjectIndex].teachers = [{ name: "", slots: "" }];
		}

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

	const moveTeacherUp = (subjectIndex, teacherIndex) => {
		if (teacherIndex > 0) {
			const newSubjects = [...subjects];
			const subject = newSubjects[subjectIndex];
			[subject.teachers[teacherIndex - 1], subject.teachers[teacherIndex]] = [
				subject.teachers[teacherIndex],
				subject.teachers[teacherIndex - 1],
			];
			setSubjects(newSubjects);
		}
	};

	const moveTeacherDown = (subjectIndex, teacherIndex) => {
		const newSubjects = [...subjects];
		const subject = newSubjects[subjectIndex];
		if (teacherIndex < subject.teachers.length - 1) {
			[subject.teachers[teacherIndex], subject.teachers[teacherIndex + 1]] = [
				subject.teachers[teacherIndex + 1],
				subject.teachers[teacherIndex],
			];
			setSubjects(newSubjects);
		}
	};

	const removeSubject = (subjectIndex) => {
		const newSubjects = subjects.filter((_, index) => index !== subjectIndex);
		setSubjects(newSubjects);
		setSubjectCount(subjectCount - 1);
	};

	const generateTimetable = () => {
		if (subjects.some((subject) => subject.teachers.length === 0)) {
			console.log(
				"Please fill in data for all subjects before generating the timetable."
			);
			if (showEror) {
				toast.error(
					"Please fill in data for all subjects before generating the timetable."
				);
				setShowError(false);
			}
			return;
		}

		// check if the slots are from the list slotList, if anything outside from it then return
		const validSlots = [
			"A1",
			"B1",
			"C1",
			"D1",
			"E1",
			"F1",
			"G1",
			"TA1",
			"TB1",
			"TC1",
			"TD1",
			"TE1",
			"TF1",
			"TG1",
			"A2",
			"B2",
			"C2",
			"D2",
			"E2",
			"F2",
			"G2",
			"TA2",
			"TB2",
			"TC2",
			"TD2",
			"TE2",
			"TF2",
			"TG2",
			"L1",
			"L2",
			"L3",
			"L4",
			"L5",
			"L6",
			"L7",
			"L8",
			"L9",
			"L10",
			"L11",
			"L12",
			"L13",
			"L14",
			"L15",
			"L16",
			"L17",
			"L18",
			"L19",
			"L20",
			"L21",
			"L22",
			"L23",
			"L24",
			"L25",
			"L26",
			"L27",
			"L28",
			"L29",
			"L30",
			"L31",
			"L32",
			"L33",
			"L34",
			"L35",
			"L36",
			"L37",
			"L38",
			"L39",
			"L40",
			"L41",
			"L42",
			"L43",
			"L44",
			"L45",
			"L46",
			"L47",
			"L48",
			"L49",
			"L50",
			"L51",
			"L52",
			"L53",
			"L54",
			"L55",
			"L56",
			"L57",
			"L58",
			"L59",
			"L60",
			"S1",
			"S2",
			"S3",
			"S4",
			"S11",
			"S15",
		];
		// Check for invalid slots
		let invalidSlots = [];
		subjects.forEach((subject) => {
			subject.teachers.forEach((teacher) => {
				const teacherSlots = teacher.slots
					.split(",")
					.map((slot) => slot.trim());
				const invalidTeacherSlots = teacherSlots.filter(
					(slot) => !validSlots.includes(slot)
				);
				if (invalidTeacherSlots.length > 0) {
					invalidSlots.push(...invalidTeacherSlots);
				}
			});
		});

		if (invalidSlots.length > 0) {
			const uniqueInvalidSlots = [...new Set(invalidSlots)];
			const errorMessage = `Invalid slots detected: ${uniqueInvalidSlots.join(
				","
			)}. Please use only valid slots.`;
			console.log(errorMessage);
			if (showEror) {
				toast.error(errorMessage);
				setShowError(false);
			}
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
			console.log(
				"Please ensure all subjects have at least one teacher with their slots mentioned."
			);
			if (showEror) {
				toast.error(
					"Please ensure all subjects have at least one teacher with their slots mentioned."
				);
				setShowError(false);
			}
			return;
		}

		// console.log(JSON.stringify(initial, null, 2)); // Log the initial array
		// console.log(initial);
		const result = generateTimetables(initial);
		updateAlldata(result);
		setShowError(false);
	};

	useEffect(() => {
		generateTimetable();
	}, [subjects]);

	const savePreset = () => {
		if (!presetName) {
			toast.error("Please enter a name for the preset.");
			return;
		}
		const newPreset = { name: presetName, data: subjects };
		const updatedPresets = [...presets, newPreset];
		setPresets(updatedPresets);
		localStorage.setItem("timetablePresets", JSON.stringify(updatedPresets));
		setPresetName("");
		toast.success("Preset saved successfully!");
	};

	const loadPreset = (preset) => {
		setSelectedPreset(preset);
		setSubjects(preset.data);
		setSubjectCount(preset.data.length);
	};

	const updatePreset = () => {
		if (!selectedPreset) {
			toast.error("Please select a preset to update.");
			return;
		}
		const updatedPresets = presets.map((p) =>
			p.name === selectedPreset.name ? { ...p, data: subjects } : p
		);
		setPresets(updatedPresets);
		localStorage.setItem("timetablePresets", JSON.stringify(updatedPresets));
		toast.success("Preset updated successfully!");
	};

	const generatePresetCode = () => {
		if (!selectedPreset) {
			toast.error("Please select a preset first.");
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
			toast.error("Invalid preset code. Please check and try again.");
			navigate("/"); // Redirect to home page
			setPresetCode("");
		}
	};

	const handleCopyClick = () => {
		navigator.clipboard.writeText(presetCode);
		toast.success("Copied");
	};

	const handleShareClick = () => {
		navigator.clipboard.writeText(
			"https://ffcs-helper.vercel.app/" + presetCode
		);
		toast.success("Link copied");
	};

	return (
		<div className="min-h-screen flex-col p-2 sm:p-6 bg-gray-100 py-6 sm:py-10">
			<div className="flex justify-center items-center px-2 sm:px-4">
				<p className="border-2 border-yellow-500 rounded-full p-2 sm:p-4 px-4 sm:px-8 mb-4 text-xs sm:text-lg text-center flex flex-row items-center gap-2 sm:gap-4 bg-yellow-100 font-medium text-yellow-700 max-w-full sm:max-w-3xl lg:max-w-5xl">
					<IoSparklesSharp className="text-yellow-700 text-2xl sm:text-3xl flex-shrink-0" />
					<span>
						Enter the details of the subjects and teachers below to generate a
						timetable. Faculty and thier slots are already added for the courses.
					</span>
				</p>
			</div>
			<div className="flex flex-col lg:flex-row justify-center px-2 sm:px-4 lg:px-20 gap-4 lg:gap-10 items-start ">
				{/* <div className="w-full lg:w-1/3 mb-4 lg:mb-0 md:top-0">
					<PresetHelper />
				</div> */}
				<div className="bg-white w-full lg:w-7/8 shadow-lg rounded-2xl p-4 sm:p-8 mb-10">
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
								onClick={() => {
									const newCount = Math.max(1, subjectCount - 1);
									setSubjectCount(newCount);
									handleSubjectCountChange({
										target: { value: newCount.toString() },
									});
								}}
							>
								-
							</button>
							<button
								className="ml-2 text-white bg-blue-500 hover:bg-blue-700 font-bold text-xl rounded-xl px-3 py-1"
								onClick={() => {
									const newCount = subjectCount + 1;
									setSubjectCount(newCount);
									handleSubjectCountChange({
										target: { value: newCount.toString() },
									});
								}}
							>
								+
							</button>
						</div>
					</div>
					{/* info text */}
					<div
					className="flex flex-row justify-between items-center mb-4"
					>
						<IoMdInformationCircle
						className="text-yellow-600 h-12 w-12 transform transition-transform duration-200 rounded-full mr-1"
						/>
						<p className="text-gray-700 text-xs sm:text-sm font-semibold my-2 px-2">
						The Course and Faculty details are from the PDF available at VTOP Spotlight . Please recheck the faculty and their slots before generating the timetable especially Embedded Courses.
						</p>
					</div>

					{/* small caution text */}
					<p className="text-orange-600 text-xs sm:text-sm font-semibold mb-4">
						Use the arrows to change the preference order of the teachers. Top
						to bottom is the order of preference.
					</p>

					{/* Subjects and teachers inputs */}
					{subjects.map((subject, subjectIndex) => (
						<div
							key={subjectIndex}
							className="mb-8 p-4 sm:p-6 bg-gray-50 border-4 border-gray-200 rounded-2xl shadow-md"
						>
							<div className="flex flex-row justify-between items-center mb-4">
								<SubjectSearchInput
									value={subject.name}
									onChange={(value) =>
										handleSubjectNameChange(subjectIndex, value)
									}
								/>

								<button
									className="text-red-600 hover:bg-red-500 hover:text-white font-semibold rounded-full focus:outline-none focus:shadow-outline p-0.5 duration-200"
									onClick={() => removeSubject(subjectIndex)}
								>
									<MdDeleteOutline
										className="inline-block align-middle"
										size={32}
									/>
								</button>
							</div>
							{subject.teachers.map((teacher, teacherIndex) => (
								<div
									key={teacherIndex}
									className="mb-4 flex flex-col sm:flex-row items-center"
								>
									<div className="flex ">
										<div className="flex flex-col mr-2 mb-2 sm:mb-0">
											<button
												className="text-gray-600 hover:text-blue-600 focus:outline-none"
												onClick={() =>
													moveTeacherUp(subjectIndex, teacherIndex)
												}
												disabled={teacherIndex === 0}
											>
												<IoMdArrowUp size={20} />
											</button>
											<button
												className="text-gray-600 hover:text-blue-600 focus:outline-none"
												onClick={() =>
													moveTeacherDown(subjectIndex, teacherIndex)
												}
												disabled={teacherIndex === subject.teachers.length - 1}
											>
												<IoMdArrowDown size={20} />
											</button>
										</div>
										<div className="flex">
											<input
												className="w-full  flex-grow shadow appearance-none border border-gray-300 rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0 sm:mr-2"
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
												className="w-full  flex-grow shadow appearance-none border border-gray-300 rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0 sm:mr-2"
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
										</div>
									</div>
									<div className="flex justify-center items-center gap-4">
										<SlotSelector
											value={teacher.slots}
											onChange={(newSlots) =>
												handleTeacherChange(
													subjectIndex,
													teacherIndex,
													"slots",
													newSlots
												)
											}
										/>
										<button
											className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full focus:outline-none focus:shadow-outline sm:mt-0 sm:ml-2"
											onClick={() => removeTeacher(subjectIndex, teacherIndex)}
										>
											<MdOutlineRemoveCircleOutline
												className="align-middle hidden sm:inline-block "
												size={32}
											/>
											<p className="px-3 py-2 sm:hidden">Remove</p>
										</button>
									</div>
								</div>
							))}
							<button
								className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
								onClick={() => addTeacher(subjectIndex)}
							>
								Add Teacher
							</button>
						</div>
					))}

					{/* Generate timetable button */}
					<button
						className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline mb-6"
						onClick={() => {
							setShowError(true);
							generateTimetable();
						}}
					>
						Generate Timetable
					</button>

					{/* Preset settings dropdown */}
					<div className="mb-6">
						<div
							className="flex flex-col sm:flex-row justify-between items-center cursor-pointer bg-yellow-100 border-2 border-yellow-500 rounded-xl p-2 sm:p-1 shadow-md"
							onClick={() => setShowPresetSettings(!showPresetSettings)}
						>
							<IoMdInformationCircle
								className={`hidden sm:inline-block text-yellow-600 h-12 w-12 sm:h-20 sm:w-20 transform transition-transform duration-200 rounded-full mx-2 ${showPresetSettings ? "rotate-180" : ""}`}
							/>
							<p className="text-gray-700 text-xs sm:text-md font-semibold my-2 sm:my-0 px-2">
								Finding it difficult to select subjects and teachers again and
								again? Explore the preset settings below to save the set of
								timetables you have created and to share it or save it for
								future use.
							</p>
							<FaChevronDown
								className={`text-yellow-800 h-6 w-6 sm:h-10 sm:w-10 transform transition-transform duration-200 rounded-full mx-4 ${showPresetSettings ? "rotate-180" : ""}`}
							/>
						</div>

						{showPresetSettings && (
							<div className="mt-4">
								{/* Preset selection and management */}
								<div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
									<div className="w-full sm:w-1/2 pr-0 sm:pr-2 mb-4 sm:mb-0">
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
									<div className="w-full sm:w-1/2 pl-0 sm:pl-2">
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
								<div className="mb-6 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
									<button
										className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
										onClick={updatePreset}
									>
										Update Selected Preset
									</button>
									<button
										className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
										onClick={savePreset}
									>
										Save as New Preset
									</button>
								</div>

								{/* Unique code generator */}
								<div className="mb-6">
									<h2 className="text-xl font-semibold mb-1 text-gray-800">
										Preset Code
									</h2>
									<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
										<input
											className="w-full sm:flex-grow shadow appearance-none border border-gray-300 rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 sm:mb-0 sm:mr-2"
											type="text"
											placeholder="Enter preset code"
											value={presetCode}
											onChange={(e) => setPresetCode(e.target.value)}
										/>
										{codeGenerated && (
											<div className="flex justify-center sm:justify-start gap-2 mb-2 sm:mb-0">
												<div className="relative flex items-center">
													<MdContentCopy
														className="text-gray-600 h-6 hover:text-gray-700 cursor-pointer"
														onClick={handleCopyClick}
														title="Copy to clipboard"
													/>
												</div>
												<div className="relative flex items-center">
													<IoShareSocialSharp
														className="text-gray-600 h-6 hover:text-gray-700 cursor-pointer"
														onClick={handleShareClick}
														title="Share"
													/>
												</div>
											</div>
										)}
										<div className="flex gap-2">
											<button
												className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
												onClick={generatePresetCode}
											>
												Generate Code
											</button>
											<button
												className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
												onClick={loadPresetFromCode}
											>
												Load from Code
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimetableInput;
