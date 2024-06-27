import React from "react";
import { ImCross } from "react-icons/im";
import { FiSend, FiInfo } from "react-icons/fi";


const Tutorial = ({ closeModal }) => {
    const handleClose = () => {
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white rounded-lg p-8 max-w-[70%] max-h-[80%] w-full relative overflow-y-auto">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                >
                    <ImCross />
                </button>
                <h2 className="text-3xl font-extrabold text-center mb-4">
                    Check out FFCS Timetable Generator
                </h2>
                <p className="text-gray-700 text-xl mb-4">
                    Welcome to the FFCS Timetable Generator! Here you can easily create
                    and manage your course schedule. Follow these steps to get started:
                </p>

                <div className="flex flex-col gap-10">
                    <div>
                        <h3 className="text-2xl font-bold mt-6 mb-2">HOW TO CREATE A TIMETABLE</h3>
                        <ul className="list-decimal list-inside text-gray-700 space-y-4">
                            <li>
                                <strong>Enter a Preset Name:</strong>
                                <p>Start by entering a name for your timetable, such as "Timetable 1".</p>
                                <img src="enter-preset-name.png" alt="Enter preset name" className="mt-2" />
                            </li>
                            <li>
                                <strong>Select Number of Subjects:</strong>
                                <p>Specify the number of subjects you want to include in your timetable.</p>
                                <img src="select-number-of-subjects.png" alt="Select number of subjects" className="mt-2" />
                            </li>
                            <li>
                                <strong>Add Teachers and Slots:</strong>
                                <p>
                                    For each subject, add the teachers and their available slots using a comma-separated or `+` format.
                                    Ensure you list the teachers in the order you prefer to prioritize their slots.
                                </p>
                                <img src="add-teachers-and-slots.png" alt="Add teachers and slots" className="mt-2" />
                            </li>
							<p>
								**Note:** When adding teachers, list the teacher you want to prioritize first, followed by the next preferred teacher,
								to ensure the timetable is organized accordingly.
							</p>
                            <li>
								<strong>Generate Timetable:</strong>
								<p>
									Click the 
									<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
										Generate Timetable
									</span>
									button to create your timetable based on the inputted data.
								</p>
								{/* <img src="generate-timetable.png" alt="Generate timetable" className="mt-2" /> */}
							</li>
                            <li>
                                <strong>Save the Timetable:</strong>
                                <p>If you are satisfied with the generated timetable, click 
									<span className="text-white font-bold bg-blue-500 border-2 border-blue-300 px-2 py-1 rounded-2xl inline-block mx-1">
										Save as New Preset
									</span>
									to save it.
								</p>
                                {/* <img src="save-timetable.png" alt="Save timetable" className="mt-2" /> */}
                            </li>
                            <li>
                                <strong>Edit and Update Teachers:</strong>
                                <p>
                                    To modify the teacher assignments in an existing preset, make the necessary changes and then click 
									<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
										Update Selected Preset
									</span>
									to save the updates.
                                </p>
                                <img src="edit-and-update-teachers.png" alt="Edit and update teachers" className="mt-2" />
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-6 mb-2">SHARING TIMETABLE PRESETS WITH FRIENDS</h3>
                        <ul className="list-decimal list-inside text-gray-700 space-y-4">
                            <li>
                                <strong>Select the Preset Name:</strong>
                                <p>Choose the preset you want to share from your list of saved presets.</p>
                                <img src="select-preset-name.png" alt="Select preset name" className="mt-2" />
                            </li>
                            <li>
                                <strong>Generate a Preset Code:</strong>
                                <p>Click the
									<span className="text-white font-bold bg-blue-500 border-2 border-blue-300 px-2 py-1 rounded-2xl inline-block mx-1">
										Generate Code
									</span>
									button to create a unique code for the selected preset. Copy this code.</p>
                                {/* <img src="generate-preset-code.png" alt="Generate preset code" className="mt-2" /> */}
                            </li>
                            <li>
                                <strong>Send the Code:</strong>
                                <p>Share the copied code with your friend.</p>
                                <img src="send-code.png" alt="Send code" className="mt-2" />
                            </li>
                            <li>
                                <strong>Loading the Code on a Friend's Account:</strong>
                                <p>Your friend needs to enter the received code in their "Preset Code" field and click 
									<span className="text-white font-bold bg-green-500 border-2 border-green-300 px-2 py-1 rounded-2xl inline-block mx-1">
										Load from Code
									</span>.</p>
                                {/* <img src="load-code.png" alt="Load code" className="mt-2" /> */}
                            </li>
                            <li>
                                <strong>Save as New Preset:</strong>
                                <p>Your friend can then click 
									<span className="text-white font-bold bg-blue-500 border-2 border-blue-300 px-2 py-1 rounded-2xl inline-block mx-1">
										Save as New Preset
									</span>
									to add the timetable to their presets.</p>
                                {/* <img src="save-as-new-preset.png" alt="Save as new preset" className="mt-2" /> */}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mt-6 mb-2">SHARING THE WEBSITE</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-4">
                            <li>
                                <strong>Click the Share Button:</strong>
                                <p>Use the
									<span className="text-white font-bold  flex-row items-center bg-gray-800 border-2 border-blue-500 px-2 py-1 rounded-2xl inline-block mx-1">
										{/* <FiSend className="mr-2" /> */}
										Share
									</span>
									button on the website to share the link with your friends via WhatsApp.</p>
                                <img src="share-button.png" alt="Share button" className="mt-2" />
                            </li>
                            <li>
                                <strong>Share the Link:</strong>
                                <p>This action allows your friends to access the website easily and create their own timetables for a more comfortable FFCS experience.</p>
                                {/* <img src="share-link.png" alt="Share link" className="mt-2" /> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
