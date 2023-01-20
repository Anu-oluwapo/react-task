import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [tasks, setTasks] = useState([])
  const counter = useSelector( state=> state.counter)
  
  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    
    getTasks()
  }, [])

    //Fetch Tasks

    const fetchTasks = async ()=>{
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      return data
    }

    const fetchTask = async (id)=>{
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }

    //Add Task

    const addTask = async (task) =>{
      const res = await fetch(`http://localhost:5000/tasks/`,
      {
        method: 'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      })

      const data = await res.json()

      setTasks([...tasks, data])
    }

    //Delete Task

    const deleteTask = async (id) =>{
      await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'DELETE',
      })

      setTasks(tasks.filter(task=>task.id !== id))
    }

    //toggleReminder

    const toggleReminder = async (id) =>{
      const taskToToggle = await fetchTask(id)
      const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method:'PUT',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      })

      const data = await res.json()

      setTasks(tasks.map(task=> task.id === id ? {...task, reminder: data.reminder} : task))
    }

    //toggleShowTask

    const toggleShowTaskForm = () =>{
      setShowTaskForm(!showTaskForm)
    }


  return (
    <Router>
    <div className="App container">
    <Header showTaskForm={showTaskForm}  toggleShowTaskForm = {toggleShowTaskForm} />
    <Routes>
      <Route path="/" exact element={
        <>
        {showTaskForm ?<AddTask tasks={tasks} addTask={addTask} /> : ''}
        {tasks.length > 0 ? <Tasks deleteTask={deleteTask} toggleReminder={toggleReminder} tasks={tasks} /> : 'No Tasks To Show'}
        </>
  } />
      
      <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <h1>Counter {counter}</h1>

    </div>
    </Router>
  );
}

export default App;
