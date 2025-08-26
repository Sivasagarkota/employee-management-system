import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EmployeeList from './components/EmployeeList'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import SearchEmployee from './components/SearchEmployee'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <SearchEmployee/>
        <main className="flex-grow container mx-auto py-4">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/add-employee" element={<AddEmployee/>}></Route>
            <Route path="/edit-employee/:id" element={<EditEmployee/>}></Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  </StrictMode>
);
