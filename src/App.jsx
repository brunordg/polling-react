import { useState } from 'react'
import './App.css'
import Header from './pages/header/Header'
import Signup from './pages/auth/signup/Signup'
import Login from './pages/auth/login/Login'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </>
  )
}

export default App
