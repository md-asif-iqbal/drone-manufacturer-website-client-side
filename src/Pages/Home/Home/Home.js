import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import NotFound from '../../Shared/NotFound/NotFound';
import Banner from '../Banner/Banner';

import Banner2 from '../Banner/Banner2';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import New from '../New/New';
import OurService from '../OurService/OurService';
import Parts from '../Parts/Parts';
import Rating from '../Rating/Rating';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <Parts></Parts>
            <New/>
            <BusinessSummary></BusinessSummary>
            <progress class="progress  lg:w-96 mt-5 progress-info "></progress>
            <OurService/>
            <Rating></Rating>
            
            
          
  
        </div>
    );
};

export default Home;