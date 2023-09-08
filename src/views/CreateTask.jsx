import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// Function to generate time options for the select input
const generateTimeOptions = () => {
  const options = [];

  for (let hour = 0; hour < 12; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time12 = `${hour === 0 ? 12 : hour}:${minute.toString().padStart(2, '0')}`;
      const amOption = <option key={`${time12}AM`} value={`${time12} AM`}>{time12} AM</option>;
      options.push(amOption);
    }
  }

  for (let hour = 1; hour <= 12; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time12 = `${hour === 0 ? 12 : hour}:${minute.toString().padStart(2, '0')}`;
      const pmOption = <option key={`${time12}PM`} value={`${time12} PM`}>{time12} PM</option>;
      options.push(pmOption);
    }
  }

  return options;
};

const CreateTask = () => {

  const navigate = useNavigate()

  // State for task information
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    const id = window.sessionStorage.getItem('userId')
    setUserId(id)
  },[])


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/todos/createtask', {taskName, taskTime, taskDate, userId})
    .then( () => navigate('/home') )
    .catch(err => console.log(err)) 
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mt-20 flex flex-col justify-center items-center gap-5 bg-blue-400 p-20 w-2/4 h-1/3 m-auto rounded-lg shadow-2xl"
    >
      <h1 
        className="text-2xl text-white font-bold text-center"
        >CREATE NEW TASK
      </h1>
      <div className="flex flex-col justify-between items-center gap-2">
        <label className="text-lg text-black ">Task Name</label>
        <input
          className="bg-white rounded-lg w-full p-2" 
          type="text" 
          placeholder="Task Name" 
          onChange={(e) => setTaskName(e.target.value)} 
          value={taskName} 
          required
        />
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <label className="text-lg text-black ">Task Date</label>
        <input
          className="bg-white rounded-lg w-full p-2" 
          type="date" 
          onChange={(e) => setTaskDate(e.target.value)} 
          value={taskDate} 
          required
        />
      </div>
      <div className="flex flex-col justify-between items-center gap-2">
        <label className="text-lg text-black">Task Time</label>
        <select
          className="bg-white rounded-lg w-full p-2"
          onChange={(e) => setTaskTime(e.target.value)}
          value={taskTime}
          required
        >
          <option value="">Select Time</option>
          {generateTimeOptions()}
        </select>
      </div>
      <button 
        className="bg-[rgb(220,89,87)] p-2 text-white rounded-lg hover:bg-white hover:text-[rgb(220,89,87)] mt-5" 
        type="submit"
        >Create Task
      </button>
    </form>
  )
};

export default CreateTask;
