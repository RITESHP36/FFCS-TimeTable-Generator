import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import TimeTable from "./TimeTable";
import Navbar from "./NavBar";
import { MdContentCopy } from "react-icons/md";

function ViewTimeTable() {
	const { id } = useParams();

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

	const Data = JSON.parse(atob(id));

	const timetableRef = useRef(null);

	const handlePrint = () => {
		const printContent = timetableRef.current;
		const originalClassName = printContent.className;

		// Apply print-specific styles
		printContent.classList.add("print-content");

		// Print and restore original styles after printing
		window.print();

		// Remove print-specific styles
		printContent.className = originalClassName;
	};

	return (
		<div>
		  <Navbar />
		  <div className="flex flex-col sm:flex-row my-4 px-4 sm:px-6 gap-4">
			<button
			  onClick={handlePrint}
			  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-200 ease-in-out w-full sm:w-auto"
			>
			  Print TimeTable
			</button>
			<button
			  onClick={() => {
				navigator.clipboard.writeText(window.location.href);
			  }}
			  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:shadow-xl transition duration-200 ease-in-out w-full sm:w-auto flex items-center justify-center gap-2"
			>
			  <span>Copy Link</span> <MdContentCopy />
			</button>
		  </div>
		  <div ref={timetableRef} className="px-2 sm:px-6">
			<TimeTable
			  data={Data}
			  morning_slots={morning_slots}
			  evening_slots={evening_slots}
			/>
		  </div>
		</div>
	  );
}

export default ViewTimeTable;
