import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

  const navigate = useNavigate()

  useEffect(() => {
    window.sessionStorage.removeItem('userName')
    window.sessionStorage.removeItem('userId')
  }, [])

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast('Passwords did not match, Please retry')
      setPassword('');
      setConfirmPassword('');
      return;
    } 

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/users/signup', { name, email, password });
      console.log(res);
      console.log(res.data);
      console.log(res.data.message)
      console.log(res.data.success)
      
      if (res.data.success === false) {
        toast(res.data.message)
      } else {
        window.sessionStorage.setItem('userName', res.data.userName)
        window.sessionStorage.setItem('userId', res.data.id)
        navigate('/home');
        // Redirect or show success message
      }

      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
      // Handle error, show error message, etc.
    }
  };

    return (
      <>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />  
        <form
          onSubmit={handleSubmit}
          className="mt-20 flex flex-col justify-center items-center gap-5 bg-blue-400 p-20 w-1/3 h-1/3 m-auto rounded-lg shadow-2xl"
        >
    
        <h1 
          className="text-2xl text-white font-bold text-center"
          >SIGN UP
        </h1>
    
        <div className="flex flex-col justify-between items-center gap-2">
          <label className="text-lg text-black ">Name</label>
          <input
            className="bg-white rounded-lg p-2 w-full" 
            type="text" 
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        
        <div className="flex flex-col justify-between items-center gap-2">
          <label className="text-lg text-black "> Email</label>
          <input
            className="bg-white rounded-lg p-2 w-full" 
            type="text" 
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
    
        <div className="flex flex-col justify-between items-center gap-2">
          <label className="text-lg text-black ">Password</label>
          <input
            className="bg-white rounded-lg p-2 w-full"
            type="password"
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <div className="flex flex-col justify-between items-center gap-2">
          <label className="text-lg text-black "> Confirm Password</label>
          <input
            className="bg-white rounded-lg p-2 w-full"
            type="password"
            placeholder="Comfirm Password" 
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
        </div>

        <button 
          className="bg-[rgb(220,89,87)] p-2 text-white rounded-lg hover:bg-white hover:text-[rgb(220,89,87)] mt-5" 
          type="submit"
          disabled={loading} // Disable the button when loading 
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p>Do you have an existing account? <Link to='/login'>Log In</Link></p>
    
      </form>
      </>
      )
    };

export default Signup;
