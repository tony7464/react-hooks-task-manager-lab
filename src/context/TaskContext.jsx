import React, { createContext, useState, useEffect } from "react";

// Share tasks and task actions with any component that calls useContext(TaskContext)
export const TaskContext = createContext();

const API_URL = "http://localhost:6001/tasks";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // Load the task list once when the app starts
  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  // POST a new task to json-server, then add it to local state so the page updates
  function addTask(title) {
    const newTask = { title, completed: false };

    return fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((r) => r.json())
      .then((savedTask) => {
        setTasks((currentTasks) => [...currentTasks, savedTask]);
      });
  }

  // PATCH the completed flag in db.json, then update the matching task on the page
  function toggleComplete(task) {
    return fetch(`${API_URL}/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((r) => r.json())
      .then((updatedTask) => {
        setTasks((currentTasks) =>
          currentTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      });
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
