import {FaTimes} from 'react-icons/fa'
function Task({task, deleteTask,toggleReminder}) {
  return (
    <div onDoubleClick={() =>toggleReminder(task.id)} className={`task ${task.reminder ? 'reminder' : ''}`}>
        <h3>{task.text} <FaTimes onClick={()=>deleteTask(task.id)} style={{color:'red', cursor:'pointer'}} /></h3>
        <p>{task.day}</p>
    </div>
  )
}
 
export default Task