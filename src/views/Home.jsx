import { useState, useEffect } from "react";
import { BsTrash } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = ({setShowNavBar}) => {

    const navigate = useNavigate();

    // State to store the tasks
    const [tasks, setTasks] = useState([]);
   
    // State to store the User name
    const [userName, setUserName] = useState('');
    
    // State to store the User id
    const [userId, setUserId] = useState();

    // Fetch UserName from the server on component mount
    useEffect(() => {
        const name = window.sessionStorage.getItem('userName')
        const id = window.sessionStorage.getItem('userId')
        setUserName(name)
        setUserId(id)
    }, []);

    useEffect(() => {
        setShowNavBar(true);
    }, [setShowNavBar]);

    // Fetch tasks from the server on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/todos/todo/${userId}`);
                console.log(response.data);
                setTasks(response.data);
            } catch (err) {
                console.log(err);
            }
        };
    
        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/todos/deletetask/${id}`)
        .catch(err => console.log(err))
        window.location.reload()
    }

  return (
    <>
        <section className="flex flex-col gap-5 justify-between items-center">
            <h2 className="text-5xl font-bold pt-10">Hello</h2>
            <h2 className="text-5xl font-bold pb-10 text-transform: capitalize">{userName}!</h2>
            {tasks.map((task) => {
                return (
                    <article 
                        className='w-2/4 h-36 mx-auto mb-5 flex justify-between items-center gap-5 p-8 border-2 border-black rounded-lg shadow-2xl' 
                        key={task._id}>
                        <div>
                            <div className='text-lg font-bold'>{task.taskName}</div>
                            <div className='text-lg text-slate-500'>{task.taskDate}</div>
                            <div className='text-lg text-slate-500'>{task.taskTime}</div>
                        </div>
                        <div>
                            <button 
                                onClick={() => navigate(`/updatetask/${task._id}`)} 
                                className="text-xl p-2 text-blue-400 hover:text-blue-200"
                                ><AiOutlineEdit />
                            </button>
                            <button 
                                onClick={() => handleDelete(task._id)}
                                className="text-xl p-5 text-[rgb(220,89,87)] hover:text-red-200"
                                ><BsTrash />
                            </button>
                        </div>
                    </article>
                )
            })}
        </section>
    </>
  )
};

export default Home;
