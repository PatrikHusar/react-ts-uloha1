import { useState } from 'react'
import './App.css'
import { taskCard } from './components/taskCard'
import { addTaskFolmular } from './components/formularCard';

export type Task = {
  id: number;
  name: string;
  subject: string;
  completed: boolean;
};

const keys = ['name', 'subject'] as const;

let allTasks: Task[] = [
  {id: 0, name: "cvicenie 40/2", subject: "Matematika", completed: true},
  {id: 1, name: "vytvorit hru piskvorky", subject: "Programovanie", completed: false},
  {id: 2, name: "naucit sa deje", subject: "Dejepis", completed: false}
];
let idCounter: number = allTasks.length;

function App() {
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  
  const taskButtonPress = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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

  return (
    <>
      <div>
          {tasks.map((task) => (
            taskCard(task, taskButtonPress)
          ))}
      </div>
      <br/><br/>
      <div>
        <h1>formular</h1>
        {addTaskFolmular(addTask, keys)}
      </div>
    </>
  )
}

export default App