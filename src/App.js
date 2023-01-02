// useEffect deals with side effects and used to make something happen on page load
import {useState, useEffect} from 'react'

// bring in the router
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'



function App() {

    //another piece of state to toggle that green Add button 
    const [showAddTask, setShowAddTask] = useState(false)

    // moved the tasks array from Tasks here so this array could be accessed globally and reused in other components as well
    // now that you have json server db you move all the tasks in db.json file and it also generates IDs just like the real database so you won't have ot worry about ids either
    const [tasks, setTasks] = useState([])

    // using Fetch API with an async function
    useEffect( () => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()

        // as a second argument pass in a dependency array in case you'll add a user
    }, [])

    // separating fetch function from useEffect so it can be reused
    // fetch TASKS
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        //console.log(data)

        return data
    }

    // fetch single TASK
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        //console.log(data)

        return data
    }


    // prop function to handle 'save task' submission
    const addTask = async (task) => {
        // now that you're using json database mock you don't need to assign an id and add the task manually
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'} ,
            body: JSON.stringify(task)
        })

        // the returned data is a newly added task
        const data = await res.json()
        setTasks([...tasks, data])

        //console.log(task)
        // since you're not using database in this example you can use random number to give a newly created task an ID
        //const id=Math.floor(Math.random() * 10000) +1
        // then you need to add that newly created task to tasks array
        //const newTask = {id, ...task}
        //setTasks([...tasks, newTask])
        //console.log(newTask)
    }

    // prop function to delete the task. onDelete will be passed as a props in Tasks.js
    const deleteTask = async (id) => {

        // delete the tasks from the database
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

        //console.log('delete', id)
        // using filter() method to delete task by filtering the tasks who's id doesn't match the selected id -> filter tasks that will remain
        // only deletes the tasks from UI
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // another prop function to set a reminder to a task
    const toggleReminder = async (id) => {
        // updating reminder status on a server side
        const taskToToggle = await fetchTask(id)
        const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    }
    
    return (
        <Router> 
            <div className="container">
                <Header 
                    onAdd={() => setShowAddTask(!showAddTask)} 
                    showAdd={showAddTask} 
                />
                    
                <Routes>  
                    <Route 
                        path='/' 
                        element={
                        <>
                            {/* the line below is a shortcut to a ternary operation that says 'if showAddTask is true then show AddTask, if not do nothing' */}
                            {showAddTask && <AddTask 
                                onAdd={addTask} />}
                    
                            {/* the line below is saying 'if there are tasks inside the array then show the tasks, else show the message'.
                            deleteTask function is passed as a props, same as toggleReminder */}
                            {tasks.length > 0 ? (
                            <Tasks tasks={tasks} 
                                onDelete={deleteTask} 
                                onToggle={toggleReminder} />) : ('No tasks left')}
                        </>
                    } />

                    <Route 
                        path='/about' 
                        element={<About />} 
                    />

                </Routes>

                <Footer />
            </div>
        </Router>
    )
}

export default App;
