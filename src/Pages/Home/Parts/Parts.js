import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Purchase from '../../Private/Purchase/Purchase';
import Loading from '../../Shared/Loading/Loading';
import PartsDetail from './PartsDetail';

const Parts = () => {
  const [product , setProduct] = useState(null);
    const {data: parts, isLoading , refetch } = useQuery(['parts'] , ()=> fetch(`http://localhost:8000/parts`)
    .then(res => res.json()))
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='my-10 '>
            <h1 className='text-5xl mt-5 '>Hello :</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 '>
                    {parts.slice(0,6).map(part => <PartsDetail 
                    key={part._id}
                    part = {part}>
                      setProduct={setProduct}
                    </PartsDetail>
                    )}
                    
            </div>
            { product && <Purchase>
                 product={product}
                 setProduct={setProduct}
                 refetch = {refetch}
              </Purchase>}
        </div>
    );
};

export default Parts;
{/* <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full ">
  {parts.slice(0,6).map(part => <PartsDetail 
                    key={part._id}
                    part = {part}>
                    </PartsDetail>
                    )}
  </div> 
  <div id="item2" className="carousel-item w-full">
    <img src="https://api.lorem.space/image/car?w=800&h=200&hash=500B67FB" className="w-full" />
  </div> 
  <div id="item3" className="carousel-item w-full">
    <img src="https://api.lorem.space/image/car?w=800&h=200&hash=A89D0DE6" className="w-full" />
  </div> 
  
</div> 
<div className="flex justify-center w-full py-2 gap-2">
  <a href="#item1" className="btn btn-xs">1</a> 
  <a href="#item2" className="btn btn-xs">2</a> 
  <a href="#item3" className="btn btn-xs">3</a> 
</div> */}