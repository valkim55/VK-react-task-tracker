import Task from './Task'

// and this component is a parent to Task component, so it wraps the list and maps through it to access and manipulate each task

const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    <>
      {tasks.map( (task) => (
        <Task 
            key={task.id} 
            task={task} 
            onDelete={onDelete} 
            onToggle={onToggle}
        />
      ))}  
    </>
  )
}

export default Tasks