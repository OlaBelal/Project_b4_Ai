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
import Favorites from './pages/Favorites'; // Add this import
import { FavoritesProvider } from './context/FavoritesContext';
import Partners from './components/Partners';
import Travels from './pages/Travels';
import Companies from './pages/Companies';
import Events from './pages/Events';

function App() {
  return (
    <FavoritesProvider> {/* Wrap the entire app with FavoritesProvider */}
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
              <Route path='/GetInTouch' element={<GetInTouch/>}/>
              <Route path='/CompaniesPag' element={<CompaniesPage/>}/>
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/companies/:companyId" element={<CompaniesPage />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/travels" element={<Travels />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/events" element={<Events />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;