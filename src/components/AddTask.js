import { useState } from "react"
const AddTask = ({tasks, addTask}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const resetState = () =>{
        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    <form onSubmit={(e) => e.preventDefault(addTask({text, day, reminder}), resetState())} className="add-form">
       <div className="form-control">
        <label htmlFor="">Task</label>
        <input type='text' value={text} onChange={(e)=> setText(e.target.value)} placeholder='Add Task' required />
       </div>

       <div className="form-control">
        <label htmlFor="">Day & Time</label>
        <input type='text' value={day} onChange={(e)=> setDay(e.target.value)} placeholder='Add Day & Time' required />
       </div>

       <div className="form-control form-control-check">
        <label htmlFor="">Set Reminder</label>
        <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)} />
       </div>

       <input className="btn btn-block" type='submit' value='Save Task' />
    </form>
  )
}

export default AddTask