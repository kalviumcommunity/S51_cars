// import { useState, useEffect } from 'react'
import './App.css'   
import UserInput from './Components/UserInput/UserInput'
import Component from './Components/Component'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateData from './Components/Update'
import Login from './Components/Login'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Component/>}></Route>
        <Route path='/add' element={<UserInput/>}></Route>
        <Route path='/update/:id' element={<UpdateData/>}></Route>
        <Route path="/Login" element={<Login />}></Route>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App