import React, { useState } from "react";
import Child from "./Child";

function Parent() {
    const [message, setMessage] = useState("");
    const [displayMessage, setDisplayMessage] = useState("Hello World!");

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">State & Props</h2>
            <div className="flex gap-3 mb-6">
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Enter a message" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button 
                    onClick={() => { setDisplayMessage(message); setMessage(""); }}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Update
                </button>
            </div>
            <Child message={displayMessage} />
        </div>
    );
}

export default Parent;
