import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Landing = ({ setShowNavBar }) => {

    useEffect(() => {
        setShowNavBar(false)
    }, [setShowNavBar])

    useEffect(() => {
        window.sessionStorage.removeItem('userName')
        window.sessionStorage.removeItem('userId')
      }, [])

  return (
    <div className='flex flex-col justify-around items-center gap-4 mt-24'>
        <h1 className='text-5xl font-bold pb-10'>Create Your VERY OWN Todo List</h1>
        <div className='flex justify-between items-center gap-8'>
            <Link
                className="text-white p-1 bg-blue-400 rounded-lg hover:bg-white hover:text-blue-400"
                to={'/login'}>
                Login
            </Link>
            <Link 
                className="text-white p-1 bg-[rgb(220,89,87)] rounded-lg hover:bg-white hover:text-[rgb(220,89,87)]"
                to={'/signup'}>
                Signup
            </Link>
        </div>
    </div>
  )
};

export default Landing;
