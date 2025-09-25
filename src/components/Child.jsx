import React from "react";

function Child({ message }) {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Child Component</h3>
            <p className="text-gray-700 mb-2">Message: {message}</p>
            <p className="text-gray-600 text-sm">Character Count: {message.length}</p>
        </div>
    );
}

export default Child;
