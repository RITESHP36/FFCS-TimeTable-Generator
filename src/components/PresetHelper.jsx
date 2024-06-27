import React, { useState } from 'react';

const PresetHelper = () => {
    const [batch, setBatch] = useState('');
    const [branch, setBranch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically check if a preset exists for the given batch and branch
        // For now, we'll just show a "coming soon" message
        alert('Sorry, this feature is coming soon. If you have made a preset, please share it with us at example@email.com. It can be helpful for others!');
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Need Help with Teacher Lists?</h3>
        <p className="mb-4">
            Finding difficulty in putting all the teacher list by yourself? Use our premade presets as per your batch and branch to help make your timetable faster!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Batch</label>
            <input
                type="text"
                id="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g. 2021-2025"
            />
            </div>
            <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
            <input
                type="text"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g. Computer Science"
            />
            </div>
            <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Find Preset
            </button>
        </form>
        </div>
    );
};

export default PresetHelper;