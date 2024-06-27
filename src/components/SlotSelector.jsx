import React, { useState, useRef, useEffect } from "react";

const availableSlots = [
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

const SlotSelector = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSlots, setSelectedSlots] = useState(
		value.split(",").map((s) => s.trim())
	);
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	const toggleSlot = (slot) => {
		const updatedSlots = selectedSlots.includes(slot)
			? selectedSlots.filter((s) => s !== slot)
			: [...selectedSlots, slot];

		setSelectedSlots(updatedSlots);
		onChange(updatedSlots.join(",").replace(/^,+/g, "").trimStart());
	};

	return (
		<div className="relative" ref={ref}>
			<button
				className="w-full shadow appearance-none border border-gray-300 rounded-xl sm:py-1 sm:px-1 py-2 px-2 leading-tight focus:outline-none focus:shadow-outline
                    bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold ring-1 ring-indigo-500
                    text-xs
                    "
				onClick={() => setIsOpen(!isOpen)}
			>
				Select Slots
			</button>
			{isOpen && (
				<div
					className="absolute z-10 -left-20 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 sm:p-4
                    max-h-[150px] md:max-h-[200px]
                    "
					style={{
						width: "calc(100vw - 2rem)",
						maxWidth: "300px",
						overflowY: "auto",
					}}
				>
					<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-1 sm:gap-2">
						{availableSlots.map((slot) => (
							<div
								key={slot}
								className={`px-1 sm:px-2 py-1 text-xs sm:text-sm cursor-pointer hover:bg-gray-100 rounded ${
									selectedSlots.includes(slot) ? "bg-blue-200 font-medium" : ""
								}`}
								onClick={() => toggleSlot(slot)}
							>
								{slot}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SlotSelector;
