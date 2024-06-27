export function generateTimetables(initial) {
    if (!Array.isArray(initial) || initial.length === 0) {
        console.log("Invalid initial data. Expected a non-empty array.");
        return []; // Return an empty array if initial is invalid
    }
    console.log("Received initial data:", JSON.stringify(initial, null, 2));
	// MORNING Normal to binary table
	const M_and_E_normal_to_binary = {
		A1: ["00", "21"],
		A2: ["100", "121"],
		TA1: ["42"],
		TA2: ["142"],
		TAA1: ["14"],
		TAA2: ["114"],
		B1: ["10", "31"],
		B2: ["110", "131"],
		TB1: ["03"],
		TB2: ["103"],
		TBB1: ["24"],
		TBB2: ["124"],
		C1: ["20", "41"],
		C2: ["120", "141"],
		TC1: ["13"],
		TC2: ["113"],
		TCC1: ["34"],
		TCC2: ["134"],
		D1: ["02", "30"],
		D2: ["102", "130"],
		TD1: ["23"],
		TD2: ["123"],
		TDD1: ["44"],
		TDD2: ["144"],
		E1: ["12", "40"],
		E2: ["112", "140"],
		TE1: ["33"],
		TE2: ["133"],
		F1: ["01", "22"],
		F2: ["101", "122"],
		TF1: ["43"],
		TF2: ["143"],
		G1: ["11", "32"],
		G2: ["111", "132"],
		TG1: ["04"],
		TG2: ["104"],
		S1: ["115"],
		S2: ["135"],
		S3: ["105"],
		S4: ["125"],
		S11: ["05"],
		S15: ["45"],
		"-": ["15", "25", "35", "145"],
		L1: ["L00"],
		L2: ["L01"],
		L3: ["L02"],
		L4: ["L03"],
		L5: ["L04"],
		L6: ["L05"],
		L7: ["L10"],
		L8: ["L11"],
		L9: ["L12"],
		L10: ["L13"],
		L11: ["L14"],
		L12: ["L15"],
		L13: ["L20"],
		L14: ["L21"],
		L15: ["L22"],
		L16: ["L23"],
		L17: ["L24"],
		L18: ["L25"],
		L19: ["L30"],
		L20: ["L31"],
		L21: ["L32"],
		L22: ["L33"],
		L23: ["L34"],
		L24: ["L35"],
		L25: ["L40"],
		L26: ["L41"],
		L27: ["L42"],
		L28: ["L43"],
		L29: ["L44"],
		L30: ["L45"],
		L31: ["L100"],
		L32: ["L101"],
		L33: ["L102"],
		L34: ["L103"],
		L35: ["L104"],
		L36: ["L105"],
		L37: ["L110"],
		L38: ["L111"],
		L39: ["L112"],
		L40: ["L113"],
		L41: ["L114"],
		L42: ["L115"],
		L43: ["L120"],
		L44: ["L121"],
		L45: ["L122"],
		L46: ["L123"],
		L47: ["L124"],
		L48: ["L125"],
		L49: ["L130"],
		L50: ["L131"],
		L51: ["L132"],
		L52: ["L133"],
		L53: ["L134"],
		L54: ["L135"],
		L55: ["L140"],
		L56: ["L141"],
		L57: ["L142"],
		L58: ["L143"],
		L59: ["L144"],
		L60: ["L145"],
	};

	const M_E_binary_to_normal = {
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
	};

	// Functions
	function normalToBin(initial) {
		const normaltobinary = M_and_E_normal_to_binary;
		const binslots = [];
		for (let i = 0; i < initial.length; i++) {
			const d = initial[i][0];
			const newd = {};
			for (const [key, value] of Object.entries(d)) {
				const v = value;
				const v1 = [];
				for (let j = 0; j < v.length; j++) {
					for (let k = 0; k < normaltobinary[v[j]].length; k++) {
						v1.push(normaltobinary[v[j]][k]);
					}
				}
				newd[key] = v1;
			}
			binslots.push([newd]);
		}
		return binslots;
	}

	function binToNormal(tt) {
		const normal = {};
		for (const [k, v] of Object.entries(tt)) {
			normal[M_E_binary_to_normal[k]] = v;
		}
		return normal;
	}

	function minimumSlots() {
		let c = 0;
		for (let i = 0; i < binslots.length; i++) {
			c += Object.values(binslots[i][0])[0].length;
		}
		return c;
	}

	// Values
	// const initial = [
	// 	// WebProg
	// 	[
	// 		{
	// 			"Dhavakumar.P": ["TG2", "L7", "L8", "L23", "L24"],
	// 			"Rama Parvathy L": ["TG2", "L21", "L22", "L29", "L30"],
	// 		},
	// 	],
	// 	// Database
	// 	[
	// 		{
	// 			"DBMS scope": ["D2", "TD2", "L3", "L4"],
	// 		},
	// 	],
	// 	// CAO
	// 	[
	// 		{
	// 			"R.Renuka Devi": ["F2", "TF2"],
	// 		},
	// 	],
	// 	// ML
	// 	[
	// 		{
	// 			"SAJIDHA S A": ["C2", "TC2", "L21", "L22"],
	// 			"Sredevi": ["C2", "TC2", "L9", "L10"],
	// 		},
	// 	],
	// 	// Complex Variable and Linear Algebra
	// 	[
	// 		{
	// 			"COMPLEX1": ["A2", "TA2", "TAA2"],
	// 		},
	// 	],
	// 	// OS
	// 	[
	// 		{
	// 			"Scope": ["E2", "TE2", "L23", "L24"],
	// 		},
	// 	],
	// 	// STS
	// 	[
	// 		{
	// 			"Enthnus": ["B2", "TB2"],
	// 		},
	// 	],
	// ];

	const len_initial = initial.length;
	const binslots = normalToBin(initial);
	const minimumslots = minimumSlots();

	function notEmpty(tt) {
		let c = 0;
		for (const v of Object.values(tt)) {
			if (v !== "") {
				c++;
			}
		}
		return c === minimumslots;
	}

	function emptySlots(tt) {
		const l = [];
		for (const [k, v] of Object.entries(tt)) {
			if (v === "") {
				l.push(k);
			}
		}
		return l;
	}

	function isSubsequence(subseq, sequence) {
		const sequenceSet = new Set(sequence);
		for (const x of subseq) {
			if (x[0].match(/\d/)) {
				if (sequenceSet.has(x) && sequenceSet.has("L" + x)) {
					continue;
				} else {
					return false;
				}
			}
			if (x[0] === "L") {
				if (sequenceSet.has(x) && sequenceSet.has(x.slice(1))) {
					continue;
				} else {
					return false;
				}
			}
		}
		return true;
	}

	function iterlistGenerator(initial) {
		const iterlist = [];
		for (let i = 0; i < len_initial; i++) {
			const len_dict = Object.keys(initial[i][0]).length;
			iterlist.push(len_dict - 1);
		}
		return iterlist;
	}

	function generatePermutations(iterlist) {
		function backtrack(index) {
			if (index === iterlist.length) {
				result.push([...iterlist]);
				return;
			}

			for (let i = 0; i <= max_value[index]; i++) {
				iterlist[index] = i;
				backtrack(index + 1);
			}
		}

		const result = [];
		const max_value = [...iterlist];
		backtrack(0);
		return result;
	}

	const iterlist = iterlistGenerator(initial);
	let iter_permutations = generatePermutations(iterlist);

	function frequencyOfMax(sequence) {
		const maxValue = Math.max(...sequence);
		return sequence.filter((x) => x === maxValue).length;
	}

	function customSort(a, b) {
		const [subjectValuesA, sumValueA, maxValueA, freqMaxValueA] = a;
		const [subjectValuesB, sumValueB, maxValueB, freqMaxValueB] = b;

		if (sumValueA !== sumValueB) return sumValueA - sumValueB;
		if (maxValueA !== maxValueB) return maxValueA - maxValueB;
		return freqMaxValueA - freqMaxValueB;
	}

	const results = iter_permutations.map((subjectValues) => {
		const sumValue = subjectValues.reduce((a, b) => a + b, 0);
		const maxValue = Math.max(...subjectValues);
		const freqMaxValue = frequencyOfMax(subjectValues);
		return [subjectValues, sumValue, maxValue, freqMaxValue];
	});

	const sortedResults = results.sort(customSort);

	const matrix = [[]];
	let prevSum = null;

	for (const result of sortedResults) {
		const [subjectValues, sumValue, maxValue, freqMaxValue] = result;
		if (prevSum !== null && sumValue !== prevSum) {
			matrix[matrix.length - 1].sort((a, b) => a[2] - b[2] || a[3] - b[3]);
			matrix.push([]);
		}
		matrix[matrix.length - 1].push([
			subjectValues,
			sumValue,
			maxValue,
			freqMaxValue,
		]);
		prevSum = sumValue;
	}
	matrix[matrix.length - 1].sort((a, b) => a[2] - b[2] || a[3] - b[3]);

	iter_permutations = matrix.flat().map((item) => item[0]);

	const timetables = [];
	for (let n = 0; n < iter_permutations.length; n++) {
		const tt = {
			"00": "",
			"01": "",
			"02": "",
			"03": "",
			"04": "",
			"05": "",
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
		};

		for (let i = 0; i < len_initial; i++) {
			const sublist = Object.entries(binslots[i][0])[iter_permutations[n][i]];
			const [k, v] = sublist;
			const result = isSubsequence(v, emptySlots(tt));

			if (!result) break;

			if (result) {
				for (let j = 0; j < v.length; j++) {
					tt[v[j]] = k;
				}
			}
		}

		if (notEmpty(tt)) {
			timetables.push(tt);
		}
	}
    // console.log(`Generated ${timetables.length} timetables`);
    // console.log("Generated timetables:", JSON.stringify(timetables, null, 2));

	return timetables;
}

