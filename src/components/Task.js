import {FaTimes} from 'react-icons/fa'

// so this individual task component is responsible for rendering, styling each task in a list
// list is used to render array elements mostly

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div   
        className={`task ${task.reminder ? 'reminder' : ' '}`} 
        onDoubleClick={() => {onToggle(task.id)}} 
    >
        <h3>
            {task.text}{' '}
            <FaTimes 
                style={{color: 'red', cursor: 'pointer'}} 
                onClick={() => onDelete(task.id)} 
            />
        </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task