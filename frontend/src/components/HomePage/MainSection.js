import React from 'react';
import HeroSection from '../SearchSection/HeroSection';
import '../HomePage/MainSection.css';
import RecentSearch from '../FuelBusiness/RecentSearch';
import DiscoverBusinesses from '../DiscoverBusiness/DiscoverBusinesses';
import NavBar from '../Navbar/NavBar';
import ImageExtraction from '../ImageExtraction/ImageExtraction';
function MainSection(props){
  
    return(
      <div>
    
    <HeroSection />
    <RecentSearch />
    <DiscoverBusinesses />
  
</div>
    )
}

export default MainSection;