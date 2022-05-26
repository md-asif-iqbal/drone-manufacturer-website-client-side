import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import ManageProductDetails from './ManageProductDetails';

const ManageProducts = () => {

    const url = `http://localhost:8000/parts`;

    const { data: allparts, isLoading , refetch } = useQuery(['allparts'], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
console.log(allparts);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div>
        <h2 className="text-2xl">All Products: {allparts.length}</h2>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Product image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Product Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       allparts.map((products , index)=><ManageProductDetails
                       key={products._id}
                       products={products}
                       index={index}
                       refetch={refetch}
                       ></ManageProductDetails>)
                   }
                </tbody>
            </table>
        </div>
    </div>
        </div>
    );
};

export default ManageProducts;