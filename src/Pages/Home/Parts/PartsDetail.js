import React from 'react';

const PartsDetail = ({part}) => {
    const { Name, img , price  ,description , min , stock} = part;
    console.log(part);
    return (
    //     object-fit: cover ; /* Do not scale the image */
    // object-position: center; /* Center the image within the element */
    // height: 30vh;
    // width: 100%;
        <div>
            <div className="card lg:max-w-lg bg-white shadow-xl ">
            <figure><img src={img} className='object-scale-down w-full h-60 px-5 py-5' alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                {Name}
                <div className="badge badge-secondary text-white">${price}</div>
                
                </h2>
                <div className='text-left'>
                    <p > {description.length>60?description.slice(0,60)+"...":description}</p>
                    <p>Minimum order <span className='text-yellow-400 font-bold'>{min}</span> piece</p>
                    <p className=''>Stock : <span className='font-bold'>{stock}</span></p>
                </div>
                <div className="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
            </div>
        </div>
    );
};

export default PartsDetail;

