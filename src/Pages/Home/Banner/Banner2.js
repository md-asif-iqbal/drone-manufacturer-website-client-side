import React from 'react';
import slider from'../../image/slider-1.png'
const Banner2 = () => {
    return (
        <>
            <div className="hero min-h-screen w-full bg-cover bg-center" style={{background: `url(${slider})`}}>
                <div className="hero-overlay bg-opacity-20"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
        </div>
        </>
    );
};

export default Banner2;