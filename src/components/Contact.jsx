import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./NavBar";

const Contact = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("access_key", "6b237d09-d693-4ee1-bb63-022b43df10d3"); // RITESH
        formData.append("access_key", "a1d6d4b1-5bcc-4f40-a810-840b13609969"); // SHAKTI

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        });
        const result = await response.json();
        if (result.success) {
            setSuccess(true);
            setError(false);
            toast.success("Message sent successfully!");
        } else {
            setError(true);
            setSuccess(false);
            toast.error("Something went wrong.");
        }
    }

    return (
        <>
            <Navbar />

            <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
                <div className="w-full lg:max-w-[60%] sm:max-w-[90%] bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="p-6 lg:p-10 sm:p-6 space-y-6">
                        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Get in touch with us 😊</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <div className="font-semibold text-gray-700">Email ID</div>
                                    <input
                                        name="email"
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        placeholder="Your email..."
                                        required
                                    />
                                </div>
                                
                                <div className="space-y-1">
                                    <div className="font-semibold text-gray-700">Phone Number</div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        placeholder="Your phone (optional)"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <div className="font-semibold text-gray-700">Query / Feedback Message</div>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                                        placeholder="Your message..."
                                        required
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 text-lg focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform hover:scale-105"
                            >
                                Send Message
                            </button>
                        </form>
                        {success && (
                            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                Message sent successfully!
                            </div>
                        )}
                        {error && (
                            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                Something went wrong. Please try again.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Contact;
