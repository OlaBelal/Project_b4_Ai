import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import TravelWithUs from './pages/TravelWithUs';
import SignUp from "./pages/SignUp";
import './styles/global.css';
import LogIn from './pages/LogIn'; 
import ContactUsForm from './pages/ContactUsForm';
import GetInTouch from './pages/GetInTouch';
import CompaniesPage from './pages/CompaniesPage';
import PaymentPage from './pages/PaymentPage';
function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Navbar />
        <main className="pb-[70px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/travel-with-us" element={<TravelWithUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/contactus' element={<ContactUsForm/>}/>
            <Route path='/GetInTouch' element={< GetInTouch/>}/>
            <Route path='/CompaniesPag' element={<CompaniesPage/>}/>
            <Route path="/payment" element={<PaymentPage />} />
            
      
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;