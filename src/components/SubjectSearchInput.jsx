import React, { useState } from "react";
import { coursename_code } from "../data/coursename_code";

const SubjectSearchInput = ({ value, onChange }) => {
	const [suggestions, setSuggestions] = useState([]);

	const handleInputChange = (e) => {
		const inputValue = e.target.value;
		onChange(inputValue);

		if (inputValue.length > 0) {
			const filteredSuggestions = Object.keys(coursename_code)
				.filter((name) => name.toLowerCase().includes(inputValue.toLowerCase()))
				.slice(0, 5); // Limit to 5 suggestions
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		onChange(suggestion);
		setSuggestions([]);
	};

	return (
		<div className="relative">
			<input
				className="w-full text-xl font-semibold bg-gray-200 border border-gray-300 rounded-xl py-2 px-3 mb-2"
				type="text"
				placeholder="Course Name"
				value={value}
				onChange={handleInputChange}
			/>
			{suggestions.length > 0 && (
				<ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 max-h-60 overflow-auto">
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
							onClick={() => handleSuggestionClick(suggestion)}
						>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SubjectSearchInput;
