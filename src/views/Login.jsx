import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate()
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    window.sessionStorage.removeItem('userName')
    window.sessionStorage.removeItem('userId')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/users/login', {email, password})
    
    .then( (res) => {
      navigate('/home')
      console.log(res)
      window.sessionStorage.setItem('userName', res.data.userName)
      window.sessionStorage.setItem('userId', res.data.id)
    })
    .catch(err => console.log(err))
  }

  return (
    <form  
    onSubmit={handleSubmit}
    className="mt-20 flex flex-col justify-center items-center gap-5 bg-blue-400 p-20 w-1/3 h-1/3 m-auto rounded-lg shadow-2xl"
  >
    
    <h1 
      className="text-2xl text-white font-bold text-center"
      >LOG IN
    </h1>

    <div className="flex flex-col justify-between items-center gap-2">
      <label className="text-lg text-black ">Email</label>
      <input
        className="bg-white rounded-lg w-full p-2" 
        type="text" 
        placeholder="Email address"
        onChange ={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
    </div>

    <div className="flex flex-col justify-between items-center gap-2">
      <label className="text-lg text-black ">Password</label>
      <input
        className="bg-white rounded-lg w-full p-2"
        placeholder="Password"
        onChange = {(e) => setPassword(e.target.value)} 
        value={password}
        type="password" 
        required
      />
    </div>

    <button 
      className="bg-[rgb(220,89,87)] p-2 text-white rounded-lg hover:bg-white hover:text-[rgb(220,89,87)] mt-5" 
      type="submit" 
      >Login
    </button>

    <p>Do you need to create an account? <Link to='/signup'>Sign Up</Link></p>

  </form>
  )
};

export default Login;
