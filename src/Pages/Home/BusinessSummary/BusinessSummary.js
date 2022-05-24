import React from 'react';

const BusinessSummary = () => {
    return (
  
    <div>
                <h1 className='text-cyan-400 text-4xl font-extrabold mt-10 mb-2 '>Our Business Summary</h1>
                <div className="lg:stats md:stats sm:stats-horizontal shadow ">
                
        <div className="stat">
            <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="stat-title">Served</div>
            <div className="stat-value">100K</div>
            <div className="stat-desc">Customers</div>
        </div>
        
        <div className="stat">
            <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            </div>
            <div className="stat-title">Annual</div>
            <div className="stat-value text-secondary">120M+</div>
            <div className="stat-desc">↗︎ revenue</div>
        </div>
        
        <div className="stat sm">
            <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="stat-title">Reviews</div>
            <div className="stat-value text-secondary">56K</div>
            <div className="stat-desc">↗︎ 90 (90%)</div>
        </div>
        <div className="stat sm">
            <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <div className="stat-title">Tools</div>
            <div className="stat-value">50+</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
        
        </div>
    </div>
     
    );
};

export default BusinessSummary;