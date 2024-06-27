import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PresetHelper = () => {
    const [year, setYear] = useState('');
    const [branch, setBranch] = useState('');
    const [preset, setPreset] = useState('');

    // Example dictionary of presets
    const presets = {
        '2021-BRS': 'Dr. Smith, Prof. Johnson, Dr. Lee',
        '2022-BAI': 'Prof. Brown, Dr. Davis, Prof. Wilson',
        // Add more presets as needed
    };

    const years = ['2021', '2022', '2023', '2024'];
    const branches = ['BCE', 'BAI', 'BRS', 'BPS'];

    const handleSubmit = (e) => {
        e.preventDefault();
        const key = `${year}-${branch}`;
        console.log('Selected key:', key); // Debug log

        if (presets[key]) {
            setPreset(presets[key]);
            console.log('Preset found:', presets[key]); // Debug log
        } else {
            toast.error('Preset not found for the selected combination.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Teacher List Presets</h3>
            <div className="flex justify-center items-center">
				<p className="border-2 border-yellow-500 rounded-full p-2 px-8 mb-4 text-sm text-center flex items-center gap-4 bg-yellow-100 font-medium text-yellow-700">
					<span>
					Select your batch year and branch to quickly populate your teacher list with a preset.
					</span>
				</p>
			</div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Batch Year</label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Year</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                    <select
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Branch</option>
                        {branches.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                    Find Preset
                </button>
            </form>
            {preset && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md">
                    <h4 className="text-lg font-semibold mb-2">Preset Code:</h4>
                    <p>{preset}</p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default PresetHelper;
