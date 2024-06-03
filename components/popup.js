import React from 'react';

const Popup = ({ onStart }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg text-center">
                <p>This website works on a theme of a song, click here to read the content.</p>
                <button
                    className="mt-4 px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg"
                    onClick={onStart}
                >
                    Start
                </button>
            </div>
        </div>
    );
};

export default Popup;
