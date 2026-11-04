import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { taskCard } from './components/taskCard'

export type Task = {
  id: number;
  name: string;
  subject: string;
  completed: boolean;
};

let allTasks: Task[] = [
  {id: 0, name: "cvicenie 40/2", subject: "Matematika", completed: true},
  {id: 1, name: "vytvorit hru piskvorky", subject: "Programovanie", completed: false},
  {id: 2, name: "naucit sa deje", subject: "Dejepis", completed: false}
];

// export function taskButtonPress(task: Task) {
//   task.completed = !task.completed;
// }

function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState<Task[]>(allTasks);
  
  const taskButtonPress = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <div>
          {tasks.map((task) => (
            taskCard(task, taskButtonPress)
          ))}
      </div>
    </>
  )
}

export default App