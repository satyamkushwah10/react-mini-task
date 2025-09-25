import React, { useState } from "react";

import Parent from "./components/Parent";
import TodoList from "./components/TodoList";
import PostsApp from "./components/PostsApp";

const tabs = [
    { id: "task1", label: "State & Props", short: "Task 1" },
    { id: "task2", label: "Todo List", short: "Task 2" },
    { id: "task3", label: "Posts API", short: "Task 3" },
];

const App = () => {
    const [activeTab, setActiveTab] = useState(() => {
        try {
            const tab = localStorage.getItem('activeTab');
            return tab ? JSON.parse(tab) : 'task1';
        } catch {
            return 'task1';
        }
    });

    function handleActiveTab(id) {
        setActiveTab(id);
        try {
            localStorage.setItem('activeTab', JSON.stringify(id));
        } catch {}
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-blue-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-blue-600 text-white grid place-items-center shadow-sm">
                            <span className="text-sm font-semibold">RM</span>
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-blue-800">React Mini Tasks</h1>
                        </div>
                    </div>
                </div>

                {/* Segmented tabs */}
                <div className="max-w-6xl mx-auto px-3 sm:px-6 pb-3">
                    <div role="tablist" aria-label="Task Tabs" className="rounded-2xl border border-blue-100 bg-white p-1.5 shadow-sm flex gap-1">
                        {tabs.map((t) => {
                            const isActive = activeTab === t.id;
                            return (
                                <button key={t.id} role="tab" aria-selected={isActive} onClick={()=>handleActiveTab(t.id)} className={["group flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition", "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400", isActive ? "bg-blue-600 text-white shadow" : "text-blue-800 hover:bg-blue-50"].join(" ")}>
                                    <span className="hidden sm:inline">{t.short}</span>
                                    <span className="sm:hidden">{t.short}</span>
                                    <span className={["ml-2 hidden sm:inline", isActive ? "text-blue-100" : "text-blue-500"].join(" ")}>{t.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* Content card */}
            <main className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-8">
                <div className="bg-white border border-blue-100 rounded-2xl shadow-lg shadow-blue-50/50 overflow-hidden">
                    <div className="border-b border-blue-50 bg-gradient-to-r from-blue-50/60 to-transparent px-4 sm:px-6 py-4">
                        <h2 className="text-lg font-semibold text-blue-800">
                            {activeTab === "task1" && "Task 1: State & Props"}
                            {activeTab === "task2" && "Task 2: Todo List"}
                            {activeTab === "task3" && "Task 3: Posts API"}
                        </h2>
                    </div>
                    <div className="p-4 sm:p-6">
                        {activeTab === "task1" && (
                            <section className="space-y-4">
                                <Parent />
                            </section>
                        )}
                        {activeTab === "task2" && (
                            <section className="space-y-4">
                                <TodoList />
                            </section>
                        )}
                        {activeTab === "task3" && (
                            <section className="space-y-4">
                                <PostsApp />
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
