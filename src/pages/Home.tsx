
import Hero from '../components/Hero';
import Partners from '../components/Partners';
import ServicesSection from '../components/Services';

import RomanticDestination from '../components/RomanticDestination';
import PopularDestinations from '../components/PopularDestinations';
import TrendingTours from '../components/TrendingTours';
import Testimonials from '../components/Testimonials';
import DiscountedTours from '../components/DiscountedTours';
import LeavingSoonTours from '../components/LeavingSoonTours';
import NewestTours from '../components/NewestTours';
import AITravel from '../components/AiTravel';
const Home = () => {
  return (
    <>
      <Hero />
      <Partners />
      <ServicesSection />
      <DiscountedTours/>
      <AITravel />
      <LeavingSoonTours/>
      <RomanticDestination />
      <NewestTours/>
      <TrendingTours />
       <PopularDestinations />
      <Testimonials />
    </>
  );
};

export default Home;