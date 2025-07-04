import TimeTable from "./components/TimeTable";
import React, { useState, useEffect } from "react";
import TimetableInput from "./components/TimeTableInput";
import { RiShareLine } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { FaCircleInfo } from "react-icons/fa6";

import Navbar from "./components/NavBar";
import Tutorial from "./components/Tutorial";

import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
	const morning_slots = {
		"00": "A1",
		"01": "F1",
		"02": "D1",
		"03": "TB1",
		"04": "TG1",
		"05": "S11",
		10: "B1",
		11: "G1",
		12: "E1",
		13: "TC1",
		14: "TAA1",
		15: "-",
		20: "C1",
		21: "A1",
		22: "F1",
		23: "TD1",
		24: "TBB1",
		25: "-",
		30: "D1",
		31: "B1",
		32: "G1",
		33: "TE1",
		34: "TCC1",
		35: "-",
		40: "E1",
		41: "C1",
		42: "TA1",
		43: "TF1",
		44: "TDD1",
		45: "S15",
		L00: "L1",
		L01: "L2",
		L02: "L3",
		L03: "L4",
		L04: "L5",
		L05: "L6",
		L10: "L7",
		L11: "L8",
		L12: "L9",
		L13: "L10",
		L14: "L11",
		L15: "L12",
		L20: "L13",
		L21: "L14",
		L22: "L15",
		L23: "L16",
		L24: "L17",
		L25: "L18",
		L30: "L19",
		L31: "L20",
		L32: "L21",
		L33: "L22",
		L34: "L23",
		L35: "L24",
		L40: "L25",
		L41: "L26",
		L42: "L27",
		L43: "L28",
		L44: "L29",
		L45: "L30",
	};
	const evening_slots = {
		100: "A2",
		101: "F2",
		102: "D2",
		103: "TB2",
		104: "TG2",
		105: "S3",
		110: "B2",
		111: "G2",
		112: "E2",
		113: "TC2",
		114: "TAA2",
		115: "S1",
		120: "C2",
		121: "A2",
		122: "F2",
		123: "TD2",
		124: "TBB2",
		125: "S4",
		130: "D2",
		131: "B2",
		132: "G2",
		133: "TE2",
		134: "TCC2",
		135: "S2",
		140: "E2",
		141: "C2",
		142: "TA2",
		143: "TF2",
		144: "TDD2",
		145: "-",
		L100: "L31",
		L101: "L32",
		L102: "L33",
		L103: "L34",
		L104: "L35",
		L105: "L36",
		L110: "L37",
		L111: "L38",
		L112: "L39",
		L113: "L40",
		L114: "L41",
		L115: "L42",
		L120: "L43",
		L121: "L44",
		L122: "L45",
		L123: "L46",
		L124: "L47",
		L125: "L48",
		L130: "L49",
		L131: "L50",
		L132: "L51",
		L133: "L52",
		L134: "L53",
		L135: "L54",
		L140: "L55",
		L141: "L56",
		L142: "L57",
		L143: "L58",
		L144: "L59",
		L145: "L60",
	};
	const tt = {};
	const [alldata, setAlldata] = useState([
		{
			10: "",
			11: "",
			12: "",
			13: "",
			14: "",
			15: "",
			20: "",
			21: "",
			22: "",
			23: "",
			24: "",
			25: "",
			30: "",
			31: "",
			32: "",
			33: "",
			34: "",
			35: "",
			40: "",
			41: "",
			42: "",
			43: "",
			44: "",
			45: "",
			100: "",
			101: "",
			102: "",
			103: "",
			104: "",
			105: "",
			110: "",
			111: "",
			112: "",
			113: "",
			114: "",
			115: "",
			120: "",
			121: "",
			122: "",
			123: "",
			124: "",
			125: "",
			130: "",
			131: "",
			132: "",
			133: "",
			134: "",
			135: "",
			140: "",
			141: "",
			142: "",
			143: "",
			144: "",
			145: "",
			"00": "",
			"01": "",
			"02": "",
			"03": "",
			"04": "",
			"05": "",
			L00: "",
			L01: "",
			L02: "",
			L03: "",
			L04: "",
			L05: "",
			L10: "",
			L11: "",
			L12: "",
			L13: "",
			L14: "",
			L15: "",
			L20: "",
			L21: "",
			L22: "",
			L23: "",
			L24: "",
			L25: "",
			L30: "",
			L31: "",
			L32: "",
			L33: "",
			L34: "",
			L35: "",
			L40: "",
			L41: "",
			L42: "",
			L43: "",
			L44: "",
			L45: "",
			L100: "",
			L101: "",
			L102: "",
			L103: "",
			L104: "",
			L105: "",
			L110: "",
			L111: "",
			L112: "",
			L113: "",
			L114: "",
			L115: "",
			L120: "",
			L121: "",
			L122: "",
			L123: "",
			L124: "",
			L125: "",
			L130: "",
			L131: "",
			L132: "",
			L133: "",
			L134: "",
			L135: "",
			L140: "",
			L141: "",
			L142: "",
			L143: "",
			L144: "",
			L145: "",
		},
	]);
	const [iter_permutations, setIter_permutations] = useState(0);
	const updateAlldata = (newData) => {
		setAlldata(newData);
	};
	const updateIter_permutations = (newData) => {
		console.log(newData);
		setIter_permutations(newData);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	// after loading for the first time, after 1 second give a toast message to checkout the info panel
	useEffect(() => {
		setTimeout(() => {
			toast("Checkout the Info panel to know more about the app", {
				icon: <FaCircleInfo size={30} color="black" />,
				duration: 5000,
				style: {
					background: "lightyellow",
					color: "black",
					fontWeight: "",
				},
			});
		}, 1000);
	}, []);

		return (
			<div className="bg-gray-100">
			<Toaster />
			{isModalOpen && <Tutorial closeModal={closeModal} />}
			<Navbar onInfoClick={openModal} />
			<TimetableInput alldata={alldata} updateAlldata={updateAlldata} updateIter_permutations={updateIter_permutations} />
			
			<div className="text-center pt-2">
				<h2 className="px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-xl bg-blue-600 text-white rounded-full  sm:mb-8 font-semibold inline-block">
				<p>Total number of CLASH-FREE TimeTables = {alldata.length}</p>
				<p className="text-yellow-300">Eliminated {Math.max(0, iter_permutations - alldata.length)} TimeTables due to clash in slots
                </p>
				</h2>
			</div>

			{/* if alldata.length=0 then show text */}
			{alldata.length === 0 && (
				<div className="text-center text-sm sm:text-lg font-semibold text-red-600 mb-6">
				No TimeTables found for the given input of slots and teachers due to clash in slots. Please try again by changing the slots or teachers.
				</div>
			)}
		
			{alldata.map((data, index) => (
				<div key={index} className="mb-8">
				<div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-4">
					<div className="flex sm:flex-col items-center gap-4 sm:ml-2">
					<p className="rounded-full bg-yellow-600 text-white font-bold text-xl sm:text-2xl p-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
						{index + 1}
					</p>
					<Link
						to={`/tt/${btoa(JSON.stringify(data))}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<RiShareLine
						className="text-yellow-600 cursor-pointer border-2 border-yellow-600 rounded-full p-1 hover:bg-yellow-600 hover:text-white text-3xl sm:text-4xl duration-300"
						title="Share this TimeTable"
						/>
					</Link>
					</div>
					<div className="w-full overflow-x-auto">
					<TimeTable
						morning_slots={morning_slots}
						evening_slots={evening_slots}
						data={data}
					/>
					</div>
				</div>
				<div className="border-black w-full border-2 h-2 my-4 bg-neutral-400 border-dashed">
					-
				</div>
				</div>
			))}
			</div>
		);
}

export default App;
