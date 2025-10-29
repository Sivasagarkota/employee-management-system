import React from 'react'
import Header from "./Header"
import Employees from './Employees';
import AddEmployee from "./AddEmployee"

function Home() {
  return (
    <div>
        <Header/>
        <Employees/>
    </div>
  )
}

export default Home;