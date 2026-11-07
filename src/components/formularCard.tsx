import React, { useState } from 'react';

export const addTaskFolmular = (addTask: (data: {[k: string]: string}) => void, keys: readonly string[]) => {
  const [form, setForm] = useState(Object.fromEntries(keys.map((key) => [key, ""])));

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev, 
      [key]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(form);
    setForm(Object.fromEntries(keys.map((key) => [key, ""])));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {keys.map((key) => (
          <label>
            {key}
            <input type="text"
              value={form[key]}
              placeholder={`Enter ${key}`}
              onChange={(e) => handleChange(key, e.target.value)}/>
          </label>
        ))}
        <button type="submit">Add Task</button>
      </form>
    </div>
  )
}
