import React, { useState } from 'react';

export const AddTaskForm = (addTask: (data: {[k: string]: string}) => void) => {
  const [form, setForm] = useState({name: "", subject: ""});

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(form);
    setForm({name: "", subject: ""});
  };

  const subjects = ["", "Mat", "Sjl", "Pro", "Fyz", "Dej"];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Task name:
          <input
            type="text"
            value={form.name}
            placeholder="Enter task name"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </label>
        <label>
          Subject:
          <select
            value={form.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};