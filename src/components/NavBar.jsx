import logo from "../assets/images/logo.png"
import { Link, useNavigate } from 'react-router-dom'


const NavBar = () => {
    
    const navigate = useNavigate()
    
    const handleLogout = () => {
        navigate('/');
        window.sessionStorage.removeItem('userName');
    }


  return (
    <nav className="flex justify-between items-center p-5 bg-black">
        <img 
            className="ml-5" 
            src={logo} 
            alt="Logo" 
        />
        <div className="flex gap-5 items-center justify-around">
            <Link 
                to={'/home'} 
                className="text-[rgb(220,89,87)] hover:text-white"
                >Home
            </Link>
            <button 
                onClick={() => navigate('/createtask')} 
                className="text-white p-1 bg-blue-400 rounded-lg hover:bg-white hover:text-blue-400"
                >Add New Task
            </button>
            <button
                className="text-white p-1 bg-[rgb(220,89,87)] rounded-lg hover:bg-white hover:text-[rgb(220,89,87)] mr-5"
                onClick={handleLogout}
                >Logout
            </button>
        </div>
    </nav>
  )
};

export default NavBar;

