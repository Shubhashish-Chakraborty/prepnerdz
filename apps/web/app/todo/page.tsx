"use client";
import React, { useState } from "react";

type Priority = "Low" | "Medium" | "High";

interface Task {
  id: number;
  name: string;
  dueDate: string;
  link: string;
  priority: Priority;
}

const priorities: Priority[] = ["Low", "Medium", "High"];

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Omit<Task, "id">>({
    name: "",
    dueDate: "",
    link: "",
    priority: "Medium",
  });

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
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>📋 Study To-Do List</h1>
      <form onSubmit={addTask} style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <input
          name="name"
          placeholder="Task name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ flex: 2, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          required
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input
          name="link"
          placeholder="Resource link"
          value={form.link}
          onChange={handleChange}
          style={{ flex: 2, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        >
          {priorities.map(p => <option key={p}>{p}</option>)}
        </select>
        <button type="submit" style={{ padding: "8px 16px", borderRadius: 4, background: "#0070f3", color: "#fff", border: "none" }}>
          Add
        </button>
      </form>
      <div>
        {tasks.map(task => (
          <div key={task.id} style={{
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px #eee",
            padding: 16,
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{task.name}</strong>
              <span style={{
                background: task.priority === "High" ? "#ff4d4f" : task.priority === "Medium" ? "#faad14" : "#52c41a",
                color: "#fff",
                borderRadius: 4,
                padding: "2px 8px",
                fontSize: 12
              }}>{task.priority}</span>
            </div>
            <div>
              Due: <span>{task.dueDate}</span>
            </div>
            {task.link && (
              <a href={task.link} target="_blank" rel="noopener noreferrer" style={{ color: "#0070f3" }}>
                Resource
              </a>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => editTask(task.id)} style={{ background: "#e6f7ff", border: "none", borderRadius: 4, padding: "4px 12px" }}>Edit</button>
              <button onClick={() => deleteTask(task.id)} style={{ background: "#fff1f0", border: "none", borderRadius: 4, padding: "4px 12px" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}