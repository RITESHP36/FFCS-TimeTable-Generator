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
		<div className="mx-2 sm:mx-4 mt-2 mb-6 bg-gray-50 overflow-x-auto">
			<table className="w-full border-collapse border-2 border-gray-500 shadow-lg text-[8px] sm:text-xs md:text-sm">
				{/* Table Heading */}
				<thead className="border-2 border-gray-500">
					<tr className="bg-gray-800 text-white">
						<th className="py-1 px-0.5 sm:py-2 sm:px-1 border border-gray-400">
							Day/Time
						</th>
						{timing1col.map((column) => (
							<th
								key={column}
								className="py-1 px-0.5 sm:py-2 sm:px-1 border-2 border-gray-500"
							>
								{timing1[parseInt(column)]}
							</th>
						))}
					</tr>
					<tr className="bg-gray-700 text-white">
						<th className="py-1 px-0.5 sm:py-2 sm:px-1 border border-gray-400"></th>
						{timing1col.map((column) => (
							<th
								key={column}
								className="py-1 px-0.5 sm:py-2 sm:px-1 border-2 border-gray-500"
							>
								{timing2[parseInt(column)]}
							</th>
						))}
					</tr>
				</thead>

				{/* Table Body */}
				<tbody>
					{rows.map((row) => (
						<tr key={row} className="even:bg-gray-100 odd:bg-white">
							{/* Day column */}
							<td className="px-0.5 sm:px-1 border-2 border-gray-500 font-semibold">
								{days[parseInt(row)]}
							</td>

							{/* Morning slots */}
							{morning_col.map((column) => (
								<td
									key={column}
									id={`${row}${column}`}
									className="border-2 border-gray-500 text-center"
								>
									<div className="grid h-full">
										<TimeSlot
											slot={morning_slots[`${row}${column}`]}
											data={data[`${row}${column}`]}
											bgColor="bg-indigo-200"
										/>
										<div className="border-t border-black w-full"></div>
										<TimeSlot
											slot={morning_slots[`L${row}${column}`]}
											data={data[`L${row}${column}`]}
											bgColor="bg-yellow-200"
										/>
									</div>
								</td>
							))}

							{/* Evening slots */}
							<td className="px-0.5 sm:px-1 border-2 border-gray-500 font-semibold">
								{lunch[parseInt(row)]}
							</td>
							{evening_col.map((column) => (
								<td
									key={column}
									className="border-2 border-gray-500 text-center"
								>
									<div className="grid h-full">
										<TimeSlot
											slot={evening_slots[`1${row}${column}`]}
											data={data[`1${row}${column}`]}
											bgColor="bg-indigo-200"
										/>
										<div className="border-t border-black w-full"></div>
										<TimeSlot
											slot={evening_slots[`L1${row}${column}`]}
											data={data[`L1${row}${column}`]}
											bgColor="bg-yellow-200"
										/>
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
const TimeSlot = ({ slot, data, bgColor }) => {
  // Function to format the data by removing specific prefixes
  const formatData = (data) => {
    return data.replace(/^Dr\. |^Prof\. /, '');
  };

  return (
    <div
      className={`${bgColor} h-8 sm:h-12 p-0.5 sm:p-1 flex flex-col justify-center items-center ${
        data ? "font-bold" : ""
      }`}
    >
      <div className="text-[6px] sm:text-xs">{slot}</div>
      <p
        className={`sm:hidden text-[6px] sm:text-xs overflow-hidden whitespace-nowrap overflow-ellipsis ${
          data ? "font-semibold" : ""
        }`}
      >
        {data ? `${formatData(data).slice(0, 4)}${formatData(data).length > 4 ? "..." : ""}` : ""}
      </p>
      <p
        className={`text-[6px] sm:text-xs overflow-hidden whitespace-nowrap overflow-ellipsis ${
          data ? "font-semibold" : ""
        }`}
      >
        {data ? `${formatData(data).slice(0, 8)}${formatData(data).length > 8 ? "..." : ""}` : ""}
      </p>
    </div>
  );
};

export default TimeTable;
