import { useState } from 'react'
import './App.css'
import { taskCard } from './components/taskCard'
import { AddTaskForm } from './components/formularCard';

export type Task = {
  id: number;
  name: string;
  subject: string;
  completed: boolean;
};

let allTasks: Task[] = [
  {id: 0, name: "cvicenie 40/2", subject: "Mat", completed: true},
  {id: 1, name: "vytvorit hru piskvorky", subject: "Pro", completed: false},
  {id: 2, name: "naucit sa deje", subject: "Dej", completed: false}
];
let idCounter: number = allTasks.length;

function App() {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  const [filter, setFilter] = useState<"all" | "completed" | "uncompleted">("all");
  
  const taskCompletedPress = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteCompletedTasks = () => {
    setTasks((prev) => prev.filter((task) => task.completed === false))
  }

  const addTask = (data: {[k: string]: string}) => {

    if (Object.values(data).some((value) => typeof value === "string" && value.trim() === "")) {
      alert("Fill out all fields please");
      return;
    }
    const newTask: Task = {
      id: idCounter,
      completed: false,
      ...data,
    };
    idCounter += 1;
    setTasks(prev => [...prev, newTask]);
  };

  const removeTask = (id: number) => {
    setTasks(prev => prev.filter((task) => task.id !== id));
  };

  const filterTasks = () => {
    return tasks.filter((task) => {
      if (filter === "all") return true
      if (filter === "completed") return task.completed
      if (filter === "uncompleted") return !task.completed
    })
  }

  const restoreSampleTasks = () => {
    const newTasks = allTasks.map(
      (task, i) => ({
        ...task, id: idCounter + i
    }));
    
    idCounter += newTasks.length;

    setTasks((prev) => [
      ...prev,
      ...newTasks
    ])
  }

  const renderTasks = () => {
    const filteredTasks = filterTasks();
    if (filteredTasks.length === 0) {
      return <p>No tasks</p>;
    }
    const areAllCompleted = tasks.every((task) => task.completed);
    return (
      <>
        {(areAllCompleted) && <p>All tasks completed</p>}
        {filteredTasks.map((task) => (
          taskCard(task, taskCompletedPress, removeTask)
        ))}
      </>
    );
  }

  return (
    <>
      <div>
        <h1>Tasks</h1>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("uncompleted")}>Uncompleted</button>
        <button onClick={() => deleteCompletedTasks()} >remove completed tasks</button>
        <button onClick={() => restoreSampleTasks()} >restore sample tasks</button>
        {renderTasks()}
      </div>
      <br/><br/>
      <div>
        <h1>formular</h1>
        {AddTaskForm(addTask)}
      </div>
    </>
  )
}

export default App