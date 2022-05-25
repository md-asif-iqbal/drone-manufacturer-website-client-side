import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import AllPartsDetails from './AllPartsDetails';

const AllParts = () => {
    const {data: allParts, isLoading , refetch } = useQuery(['parts'] , ()=> fetch(`http://localhost:8000/parts`)
    .then(res => res.json()))
    console.log(allParts);
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="carousel w-full">
  <div id="item1" className="carousel-item w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-3 ">
  {allParts.slice(0,8).map(part => <AllPartsDetails 
                    key={part._id}
                    part = {part}
                    refetch={refetch}>
                    </AllPartsDetails>
                    )}
  </div> 
  <div id="item2" className="carousel-item w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3  ">
  {allParts.slice(8,15).map(part => <AllPartsDetails 
                    key={part._id}
                    part = {part}
                    refetch={refetch}>
                    </AllPartsDetails>
                    )}
  </div> 
</div> 
<div className="flex justify-center w-full py-2 gap-5">
  <a href="#item1" className="btn btn-xs">1</a> 
  <a href="#item2" className="btn btn-xs">2</a> 
</div>
        </div>
    );
};

export default AllParts;