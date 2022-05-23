import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import NotFound from '../../Shared/NotFound/NotFound';
import Banner from '../Banner/Banner';

import Banner2 from '../Banner/Banner2';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import Parts from '../Parts/Parts';
import Rating from '../Rating/Rating';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Parts></Parts>
            <BusinessSummary></BusinessSummary>
            <Rating></Rating>
          
  
        </div>
    );
};

export default Home;