import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './views/Home'
import CreateTask from './views/CreateTask'
import NavBar from './components/NavBar'
import UpdateTask from './views/UpdateTask'
import Landing from './views/Landing'
import Login from './views/Login'
import Signup from './views/Signup'

function App() {
  
  const [showNavBar, setShowNavBar] = useState(false)
    
  return (
    <>
      <Router>
        {showNavBar && <NavBar />}
        <Routes>
            <Route path='/' element={<Landing setShowNavBar={setShowNavBar} />}></Route>
            <Route path='/home' element={<Home setShowNavBar={setShowNavBar} />}></Route>
            <Route path='/createtask' element={<CreateTask />}></Route>
            <Route path='/updatetask/:id' element={<UpdateTask />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
