import React from "react";
import { ImCross } from "react-icons/im";
import { FiSend, FiInfo } from "react-icons/fi";
import { BiCircle } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

const Tutorial = ({ closeModal }) => {
	const handleClose = () => {
		closeModal();
	};

	const NumberedIcon = ({ number }) => (
		<div className="mr-2 mt-1 flex-shrink-0 relative">
			<BiCircle className="text-2xl sm:text-3xl" />
			<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-bold">
				{number}
			</span>
		</div>
	);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 p-4">
			<div className="bg-white rounded-lg p-4 sm:p-8 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] max-h-[90vh] relative overflow-y-auto">
				<button
					onClick={handleClose}
					className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-700 hover:text-gray-900"
				>
					<ImCross />
				</button>
				<div className="flex flex-col items-center mb-4 sm:mb-6 gap-2">
					<div className="mt-6 sm:mt-0 text-center">
						<p className="text-xs sm:text-sm">
							Made with <span className="text-red-500">❤️</span> by Ritesh
							Pradhan and Shakti Swaroop Sahu.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
						<a
							href="https://github.com/RITESHP36"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2"
						>
							<FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
							<span className="text-xs sm:text-sm font-bold">
								Ritesh Pradhan
							</span>
						</a>
						<a
							href="https://github.com/prosws2210"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2"
						>
							<FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
							<span className="text-xs sm:text-sm font-bold">
								Shakti Swaroop Sahu
							</span>
						</a>
					</div>
				</div>
				<h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center mb-2 sm:mb-4">
					Check out FFCS Timetable Generator
				</h2>
				<p className="text-gray-700 text-sm sm:text-base md:text-xl mb-2 sm:mb-4">
					Welcome to the FFCS Timetable Generator! Here you can easily create
					and manage your course schedule. Follow these steps to get started:
				</p>

				<div className="flex flex-col gap-6 sm:gap-10">
					{/* <div>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 mb-2">
							HOW TO CREATE A TIMETABLE
						</h3>
						<ul className="list-none text-gray-700 space-y-4">
							<li className="flex items-start">
								<NumberedIcon number={1} />
								<div>
									<strong className="text-sm sm:text-base">
										Enter a Preset Name:
									</strong>
									<p className="text-xs sm:text-sm">
										Start by entering a name for your timetable, such as
										"Timetable 1".
									</p>
									<img
										src="enter-preset-name.png"
										alt="Enter preset name"
										className="mt-2 w-full"
									/>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={2} />
								<div>
									<strong className="text-sm sm:text-base">
										Select Number of Subjects:
									</strong>
									<p className="text-xs sm:text-sm">
										Specify the number of subjects you want to include in your
										timetable.
									</p>
									<img
										src="select-number-of-subjects.png"
										alt="Select number of subjects"
										className="mt-2 w-full"
									/>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={3} />
								<div>
									<strong className="text-sm sm:text-base">
										Add Teachers and Slots:
									</strong>
									<p className="text-xs sm:text-sm">
										For each subject, add the teachers and their available slots
										using a comma-separated or `+` format. Ensure you list the
										teachers in the order you prefer to prioritize their slots.
									</p>
									<img
										src="add-teachers-and-slots.png"
										alt="Add teachers and slots"
										className="mt-2 w-full"
									/>
								</div>
							</li>
							<p className="text-xs sm:text-sm">
								<strong className="text-sm sm:text-base">Note:</strong> When
								adding teachers, list the teacher you want to prioritize first,
								followed by the next preferred teacher, to ensure the timetable
								is organized accordingly.
							</p>
							<li className="flex items-start">
								<NumberedIcon number={4} />
								<div>
									<strong className="text-sm sm:text-base">
										Generate Timetable:
									</strong>
									<p className="text-xs sm:text-sm">
										Click the
										<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Generate Timetable
										</span>
										button to create your timetable based on the inputted data.
									</p>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={5} />
								<div>
									<strong className="text-sm sm:text-base">
										Save the Timetable:
									</strong>
									<p className="text-xs sm:text-sm">
										If you are satisfied with the generated timetable, click
										<span className="text-white font-bold bg-blue-500 border-2 border-blue-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Save as New Preset
										</span>
										to save it.
									</p>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={6} />
								<div>
									<strong className="text-sm sm:text-base">
										Edit and Update Teachers:
									</strong>
									<p className="text-xs sm:text-sm">
										To modify the teacher assignments in an existing preset,
										make the necessary changes and then click
										<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Update Selected Preset
										</span>
										to save the updates.
									</p>
									<img
										src="edit-and-update-teachers.png"
										alt="Edit and update teachers"
										className="mt-2"
									/>
								</div>
							</li>
						</ul>
					</div> */}

					<div>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 mb-2">
							HOW TO CREATE AND SHARE YOUR TIMETABLE
						</h3>
						<ul className="list-none text-gray-700 space-y-4">
							<li className="flex items-start">
								<NumberedIcon number={1} />
								<div>
									<strong className="text-sm sm:text-base">
										Enter the number of subjects:
									</strong>
									<p className="text-xs sm:text-sm">
										Start by entering how many subjects you have.
									</p>
									<img
										src="enter-number-of-subs.png"
										alt="Enter the number of subjects"
										className="mt-2 w-full"
									/>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={2} />
								<div>
									<strong className="text-sm sm:text-base">
										Enter the course name:
									</strong>
									<p className="text-xs sm:text-sm">
										Teachers will be added based on the course name you enter.
									</p>
									<img
										src="enter-course-name.png"
										alt="Enter the course name"
										className="mt-2 w-full"
									/>
									<span className="text-rose-400 font-semibold"><strong>Note:</strong> You can keep only the necessary teachers and remove others. You can also add new teachers if needed.</span>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={3} />
								<div>
									<strong className="text-sm sm:text-base">
										Generate Timetable:
									</strong>
									<p className="text-xs sm:text-sm">
										Click on the
										<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Generate Timetable
										</span>
										button to get the timetables.
									</p>
									<img
										src="generate-timetable.png"
										alt="Generate Timetable"
										className="mt-2 w-full"
									/>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={4} />
								<div>
									<strong className="text-sm sm:text-base">
										Share the Timetable:
									</strong>
									<p className="text-xs sm:text-sm">
										Click on the
										<span className="text-white font-bold bg-blue-500 border-2 border-blue-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Share
										</span>
										button to share your timetable with friends.
									</p>
									<img
										src="share-timetable.png"
										alt="Share Timetable"
										className="mt-2 w-full"
									/>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={5} />
								<div>
									<strong className="text-sm sm:text-base">
										Copy or Print the Timetable:
									</strong>
									<p className="text-xs sm:text-sm">
										Click on
										<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Copy Link
										</span>
										or
										<span className="text-white font-bold bg-blue-500 border-2 border-blue-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Print
										</span>
										to share it.
									</p>
									<img
										src="copy-print-tt.png"
										alt="Copy or Print the Timetable"
										className="mt-2 w-full"
									/>
								</div>
							</li>
						</ul>
					</div>


					<div>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 mb-2">
							SAVING TIMETABLE PRESETS
						</h3>
						<div className="border-2 mx-auto border-gray-500 rounded-2xl p-2 px-4 mb-4 text-center items-center gap-2 sm:gap-4 bg-blue-200 font-medium text-black-700 w-[70%]">
							<p className="text-black-400 font-semibold text-lg"><strong>What is a preset ???</strong> </p>
							<p className="text-blue-800 font-semibold text-sm"><strong>Note:</strong> A preset is a saved configuration for quick and easy reuse of teachers you have selected and saved.</p>
						</div>
						<ul className="list-none text-gray-700 space-y-4">
							<li className="flex items-start">
								<NumberedIcon number={1} />
								<div>
									<strong className="text-sm sm:text-base">
										Save the Timetable:
									</strong>
									<p className="text-xs sm:text-sm">
										To save the timetable, click on the button and name the combination of teachers (Preset) e.g., "Timetable 1".
									</p>
									<img
										src="select-preset.png"
										alt="Save the Timetable"
										className="mt-2 w-full"
									/>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={2} />
								<div>
									<strong className="text-sm sm:text-base">
										Save as New Preset:
									</strong>
									<p className="text-xs sm:text-sm">
										Click on
										<span className="text-white font-bold bg-blue-500 border-2 border-blue-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Save as New Preset
										</span>
										to save it.
									</p>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={3} />
								<div>
									<strong className="text-sm sm:text-base">
										Edit and Update Teachers:
									</strong>
									<p className="text-xs sm:text-sm">
										You can change the teachers and update the preset by clicking
										<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
											Update Selected Preset
										</span>.
									</p>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={4} />
								<div>
									<strong className="text-sm sm:text-base">
										Generating Codes:
									</strong>
									<p className="text-xs sm:text-sm">
										You can generate codes for your timetable and share them with your friends so they can have the same combination of teachers (Presets)
									</p>
									<img
										src="generating-codes.png"
										alt="Generating codes"
										className="mt-2 w-full"
									/>
								</div>
							</li>
						</ul>
					</div>

					{/* <div>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-4 sm:mt-6 mb-2">
							SHARING THE WEBSITE
						</h3>
						<ul className="list-none text-gray-700 space-y-4">
							<li className="flex items-start">
								<NumberedIcon number={1} />
								<div>
									<strong className="text-sm sm:text-base">
										Click the Share Button:
									</strong>
									<div className="flex items-center gap-1">
										<div>Use the</div>
										<span>
											<button className="flex items-center border-2 rounded-full px-4 py-1 bg-gray-800 border-blue-500 text-md font-medium text-blue-500">
												<FiSend className="mr-2" />
												Share
											</button>
										</span>
										<div>
											button on the website to share the link with your friends
											via WhatsApp.
										</div>
									</div>
									<img
										src="share-button.png"
										alt="Share button"
										className="mt-2"
									/>
								</div>
							</li>
							<li className="flex items-start">
								<NumberedIcon number={2} />
								<div>
									<strong className="text-sm sm:text-base">
										Share the Link:
									</strong>
									<p className="text-xs sm:text-sm">
										This action allows your friends to access the website easily
										and create their own timetables for a more comfortable FFCS
										experience.
									</p>
								</div>
							</li>
						</ul>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Tutorial;
