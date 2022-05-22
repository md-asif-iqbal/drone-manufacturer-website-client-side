import React from 'react';
import slider from'../../image/slider-2.webp'
const Banner2 = () => {
    return (
        
<div class="bg-indigo-900 relative overflow-hidden h-screen">
<img src={slider} class="absolute h-full w-full object-cover"/>
    <div class="inset-0 bg-black opacity-25 absolute">
    </div>
    
    <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
        <div class="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
            <span class="font-bold uppercase text-yellow-400">
                Himalaya
            </span>
            <h1 class="font-bold text-6xl sm:text-7xl text-white leading-tight mt-4 text-left">
                Let yourself be carried
                <br/>
                    by nature
            </h1>
            <a href="#" class="block bg-white hover:bg-gray-100 py-3 px-4 rounded-lg text-lg text-gray-800 font-bold uppercase mt-10">
                Discover
            </a>
        </div>
    </div>
</div>

    );
};

export default Banner2;