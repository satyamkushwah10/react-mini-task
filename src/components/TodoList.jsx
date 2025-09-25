import React, { useState, useEffect, useRef } from "react";

function TodoList() {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem("tasks");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        try {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        } catch (error) {
            console.error("Failed to save tasks:", error);
        }
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks((prev) => [...prev, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const toggleComplete = (id) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const startEdit = (id, text) => {
        setEditingId(id);
        setEditText(text);
    };

    const saveEdit = () => {
        setTasks((prev) => prev.map((task) => (task.id === editingId ? { ...task, text: editText } : task)));
        setEditingId(null);
        setEditText("");
    };

    const clearAll = () => {
        setTasks([]);
        localStorage.removeItem("tasks");
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Todo List with localStorage</h2>

            <div className="flex gap-3 mb-6">
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a new task" onKeyDown={(e) => e.key === "Enter" && addTask()} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={addTask} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Add
                </button>
            </div>

            <div className="flex gap-3 mb-6">
                <button className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-white border border-gray-300"}`} onClick={() => setFilter("all")}>
                    All
                </button>
                <button className={`px-4 py-2 rounded-lg ${filter === "pending" ? "bg-blue-500 text-white" : "bg-white border border-gray-300"}`} onClick={() => setFilter("pending")}>
                    Pending
                </button>
                <button className={`px-4 py-2 rounded-lg ${filter === "completed" ? "bg-blue-500 text-white" : "bg-white border border-gray-300"}`} onClick={() => setFilter("completed")}>
                    Completed
                </button>
                <button onClick={clearAll} className="ml-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Clear All
                </button>
            </div>

            <ul className="space-y-3">
                {filteredTasks.map((task) => (
                    <li key={task.id} className={`bg-white p-4 rounded-lg border border-gray-200 ${task.completed ? "opacity-60" : ""}`}>
                        {editingId === task.id ? (
                            <div className="flex gap-3 items-center">
                                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button onClick={saveEdit} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                                    Save
                                </button>
                                <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                                <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>{task.text}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(task.id, task.text)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => deleteTask(task.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
