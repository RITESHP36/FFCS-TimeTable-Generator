import React from "react";

const TimeTable = ({ morning_slots, evening_slots, data }) => {
	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	const timing1 = [
		"08:00-08:50",
		"08:55-05:45",
		"09:50-10:40",
		"10:45-11:35",
		"11:45-12:30",
		"11:45-12:30",
		"",
		"02:00-02:50",
		"02:55-03:45",
		"03:50-04:40",
		"04:45-05:35",
		"05:40-06:30",
		"06:35-07:20",
	];
	const timing2 = [
		"08:00-08:50",
		"08:50-05:40",
		"09:50-10:40",
		"10:40-11:30",
		"11:40-12:30",
		"12:30-01:20",
		"",
		"02:00-02:50",
		"02:50-03:40",
		"03:50-04:40",
		"04:40-05:30",
		"05:40-06:30",
		"06:30-07:20",
		
	];

	const lunch = ["L", "U", "N", "C", "H"];
	const rows = ["0", "1", "2", "3", "4"];
	const morning_col = ["0", "1", "2", "3", "4", "5"];
	const evening_col = ["0", "1", "2", "3", "4", "5"];
	const timing1col = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
	];

	return (
		<div className="p-6 bg-gray-50">
		<table className="min-w-full border-collapse border-4 border-gray-500 shadow-lg">

			{/* Table Heading */}
			<thead className="border-4 border-gray-500">
			<tr className="bg-gray-800 text-white">
				<th className="py-3 px-6 border border-gray-400">Day/Time</th>
				{timing1col.map((column) => (
					<th key={column} className="py-3 px-6 border-4 border-gray-500">{timing1[parseInt(column)]}</th>
				))}
			</tr>
			<tr className="bg-gray-700 text-white">
				<th className="py-3 px-6 border border-gray-400"></th>
				{timing1col.map((column) => (
					<th key={column} className="py-3 px-6 border-4 border-gray-500">{timing2[parseInt(column)]}</th>
				))}
			</tr>
			</thead>


			{/* Table Body */}
			<tbody>
			{rows.map((row) => (
				<tr key={row} className="even:bg-gray-100 odd:bg-white">

				{/* Morning slots */}
				<td className="py-3 px-6 border-4 border-gray-500 font-semibold">{days[parseInt(row)]}</td>
				{morning_col.map((column) => (
					<td key={column} id={`${row}${column}`} className="py-3 px-4 bg-yellow-100 h-40 border-4 border-gray-500 text-center">
					<div className="grid gap-2 h-full">
						<div className={`bg-yellow-200 h-16 flex flex-col justify-center items-center ${data[`${row}${column}`] ? "font-semibold" : ""}`}>
						{morning_slots[`${row}${column}`]}
						<p className={`overflow-hidden ${data[`${row}${column}`] ? "font-semibold" : ""}`}>{data[`${row}${column}`]}</p>
						</div>
						<div className="border-t-2 border-black w-full"></div>
						<div className={`bg-yellow-200 h-16 flex flex-col justify-center items-center ${data[`L${row}${column}`] ? "font-semibold" : ""}`}>
						{morning_slots[`L${row}${column}`]}
						<p className={`overflow-hidden ${data[`L${row}${column}`] ? "font-semibold" : ""}`}>{data[`L${row}${column}`]}</p>
						</div>
					</div>
					</td>
				))}

				{/* Evening slots */}
				<td className="py-3 px-6 border-4 border-gray-500 font-semibold">{lunch[parseInt(row)]}</td>
				{evening_col.map((column) => (
					<td key={column} className="py-3 px-4 bg-yellow-100 h-40 border-4 border-gray-500 text-center">
					<div className="grid gap-2 h-full">
						<div className={`bg-yellow-200 h-16 flex flex-col justify-center items-center ${data[`1${row}${column}`] ? "font-semibold" : ""}`}>
						{evening_slots[`1${row}${column}`]}
						<p className={`overflow-hidden ${data[`1${row}${column}`] ? "font-semibold" : ""}`}>{data[`1${row}${column}`]}</p>
						</div>
						<div className="border-t-2 border-black w-full"></div>
						<div className={`bg-yellow-200 h-16 flex flex-col justify-center items-center ${data[`L1${row}${column}`] ? "font-semibold" : ""}`}>
						{evening_slots[`L1${row}${column}`]}
						<p className={`overflow-hidden ${data[`L1${row}${column}`] ? "font-semibold" : ""}`}>{data[`L1${row}${column}`]}</p>
						</div>
					</div>
					</td>
				))}

				</tr>
			))}
			</tbody>
		</table>
		</div>
	);
};

export default TimeTable;
