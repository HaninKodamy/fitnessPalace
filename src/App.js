import React from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import Plans from './components/Plans/Plans';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import Testimonials from './components/Testimonials/Testimonials';
import ProgramsPage from './components/ProgramsPage/ProgramsPage'; 
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Signup from './components/Signup/Signup';
import Payment from './components/Payment/Payment';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Hero /><Programs /><Reasons /><Plans /><Testimonials /><Footer /></>}/>
          <Route path="/services" element={<ProgramsPage />} />
          <Route path="/services/classes" element={<ProgramsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment" element={<Payment/>}/>
          <Route path='/userProfile' element={<UserProfile/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
