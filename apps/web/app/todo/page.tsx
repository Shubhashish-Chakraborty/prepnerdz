"use client";
import React, { useState, useEffect } from "react";

type Priority = "Low" | "Medium" | "High";

interface Task {
  id: number;
  name: string;
  dueDate: string;
  link: string;
  priority: Priority;
}

const priorities: Priority[] = ["Low", "Medium", "High"];

// Format date as dd-mm-yyyy
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [yyyy, mm, dd] = dateStr.split("-");
  return `${dd}-${mm}-${yyyy}`;
}

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Omit<Task, "id">>({
    name: "",
    dueDate: "",
    link: "",
    priority: "Medium",
  });

  // Typing animation for heading (excluding icon)
  const headingText = "Study To-Do List";
  const [typedHeading, setTypedHeading] = useState("");
  useEffect(() => {
    setTypedHeading("");
    let i = 0;
    const interval = setInterval(() => {
      setTypedHeading(headingText.slice(0, i + 1));
      i++;
      if (i === headingText.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      { ...form, id: Date.now() }
    ]);
    setForm({ name: "", dueDate: "", link: "", priority: "Medium" });
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setForm({ name: task.name, dueDate: task.dueDate, link: task.link, priority: task.priority });
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl w-full mx-auto p-4 font-sans">
        <h1
          className="text-4xl font-extrabold mb-8 text-center drop-shadow min-h-[2.5rem]"
        >
          <span className="align-middle mr-2">📋</span>
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {typedHeading}
          </span>
        </h1>
        <form
          onSubmit={addTask}
          className="flex flex-col gap-4 mb-10 bg-white/80 p-6 rounded-2xl shadow-xl border border-blue-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="name"
              placeholder="Task name"
              value={form.name}
              onChange={handleChange}
              required
              className="flex-1 p-3 rounded-lg border border-gray-200 bg-blue-50 focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleChange}
              required
              className="flex-1 p-3 rounded-lg border border-gray-200 bg-purple-50 focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              name="link"
              placeholder="Resource link"
              value={form.link}
              onChange={handleChange}
              className="flex-1 p-3 rounded-lg border border-gray-200 bg-pink-50 focus:ring-2 focus:ring-pink-200"
            />
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="flex-1 p-3 rounded-lg border border-gray-200 bg-blue-50 focus:ring-2 focus:ring-blue-300"
            >
              {priorities.map(p => <option key={p}>{p}</option>)}
            </select>
            <button
              type="submit"
              className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-pink-400 text-white font-semibold hover:from-blue-600 hover:to-pink-500 transition-all shadow"
            >
              Add
            </button>
          </div>
        </form>
        <div className="space-y-6">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white/90 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between border-l-4 transition-all duration-200 hover:scale-[1.01] hover:border-blue-400"
              style={{
                borderColor:
                  task.priority === "High"
                    ? "#ef4444"
                    : task.priority === "Medium"
                    ? "#f59e42"
                    : "#22c55e",
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  ></span>
                  <strong className="text-lg text-gray-800">{task.name}</strong>
                  <span className="text-xs font-semibold text-gray-500 ml-2">
                    {task.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">Due Date:</span> {formatDate(task.dueDate)}
                </div>
                {task.link && (
                  <a
                    href={task.link.startsWith("http") ? task.link : `https://${task.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline text-sm font-medium hover:text-blue-900"
                  >
                    📎 Resource Link
                  </a>
                )}
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() => editTask(task.id)}
                  className="px-4 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium transition border border-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-1 rounded-full bg-red-50 text-red-700 hover:bg-red-100 font-medium transition border border-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-gray-400 mt-10">No tasks yet. Add your first one!</div>
          )}
        </div>
      </div>
    </div>
  );
}