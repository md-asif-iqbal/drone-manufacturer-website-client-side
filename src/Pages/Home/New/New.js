import React from 'react';
import img from'../../image/image-caption-2_1280x.webp'
const New = () => {

    return (
        <div>
            <div class="hero min-h-screen " style={{ backgroundImage: `url(${img})`}}>
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content  text-center text-neutral-content">
                    <div class="max-w-lg">
                    <h1 class="mb-5 lg:text-5xl text-3xl text-white font-bold">Purpose of a Drone </h1>
                    <p class="mb-5 text-white ">Drones now have many functions, ranging from monitoring climate change to carrying out search operations after natural disasters, photography, filming, and delivering goods. But their most well-known and controversial use is by the military for reconnaissance, surveillance and targeted attacks.</p>
                    <button class="btn text-white bg-accent  border-0">larn more</button>
                    </div>
                </div>
                </div>
        </div>
    );
};

export default New;