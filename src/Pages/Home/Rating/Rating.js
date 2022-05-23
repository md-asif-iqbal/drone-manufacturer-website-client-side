import React from 'react';

const Rating = () => {
    return (
        <div>
            <h1 className='text-3xl mt-7 mb-5'>Rating Our Customer </h1>
                <div className="rating rating-lg mb-5">
                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400"  />
                    <input type="radio" name="rating-8" className="mask mask-star-2  bg-orange-400" />
                    <input type="radio" name="rating-8" className="mask mask-star-2  bg-orange-400" checked/>
                    <input type="radio" name="rating-8" className="mask mask-star-2  bg-orange-400" />
                </div>
        </div>
    );
};

export default Rating;