import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		const savedPresets =
			JSON.parse(localStorage.getItem("timetablePresets")) || [];
		setPresets(savedPresets);
	}, []);

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

	return (
		<div className="min-h-screen bg-gray-100 py-10">
			<div className="max-w-4xl mx-auto px-5">
				<h1 className="text-3xl font-bold mb-5">Timetable Generator</h1>
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					{/* Preset selection and management */}
					<div className="mb-4 flex justify-between">
						<div>
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="preset-select"
							>
								Select Preset:
							</label>
							<select
								id="preset-select"
								className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
						<div>
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="preset-name"
							>
								Preset Name:
							</label>
							<input
								id="preset-name"
								className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								type="text"
								value={presetName}
								onChange={(e) => setPresetName(e.target.value)}
								placeholder="Enter preset name"
							/>
						</div>
					</div>
					<div className="mb-4">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
							onClick={savePreset}
						>
							Save as New Preset
						</button>
						<button
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={updatePreset}
						>
							Update Selected Preset
						</button>
					</div>

					{/* Unique code generator */}
					<div className="mb-4">
						<h2 className="text-xl font-bold mb-2">Preset Code</h2>
						<div className="flex items-center">
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
								type="text"
								placeholder="Enter preset code"
								value={presetCode}
								onChange={(e) => setPresetCode(e.target.value)}
							/>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
								onClick={generatePresetCode}
							>
								Generate Code
							</button>
							<button
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={loadPresetFromCode}
							>
								Load from Code
							</button>
							{/* Copy Button */}
							<button
								className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={() => navigator.clipboard.writeText(presetCode)}
							>
								Copy
							</button>
						</div>
					</div>

					{/* Subject count input */}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="number-of-subjects"
						>
							Number of Subjects:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="number-of-subjects"
							type="number"
							min="1"
							value={subjectCount}
							onChange={handleSubjectCountChange}
						/>
					</div>

					{/* Subjects and teachers inputs */}
					{subjects.map((subject, subjectIndex) => (
						<div key={subjectIndex} className="mb-6 p-4 border rounded">
							<div className="flex justify-between items-center mb-2">
								<input
									className="text-xl font-semibold bg-gray-100 border rounded py-1 px-2"
									type="text"
									placeholder={`Subject ${subjectIndex + 1}`}
									value={subject.name}
									onChange={(e) =>
										handleSubjectNameChange(subjectIndex, e.target.value)
									}
								/>
								<button
									className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
									onClick={() => removeSubject(subjectIndex)}
								>
									Remove Subject
								</button>
							</div>
							{subject.teachers.map((teacher, teacherIndex) => (
								<div key={teacherIndex} className="mb-4 flex items-center">
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
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
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
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
									<button
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
										onClick={() => removeTeacher(subjectIndex, teacherIndex)}
									>
										Remove
									</button>
								</div>
							))}
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={() => addTeacher(subjectIndex)}
							>
								Add Teacher
							</button>
						</div>
					))}

					{/* Generate timetable button */}
					<button
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
