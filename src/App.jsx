import React from 'react'
import Home from './components/Home';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditEmployee from './components/EditEmployee';
import AddEmployee from './components/AddEmployee';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/create' element={<AddEmployee/>}></Route>
          <Route path='/edit/:id' element={<EditEmployee/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;