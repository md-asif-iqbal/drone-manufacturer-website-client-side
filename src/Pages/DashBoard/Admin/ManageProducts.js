import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';
import ManageProductDetails from './ManageProductDetails';

const ManageProducts = () => {
      
    const [deletes , setDeletes] = useState(null);
    const url = `https://fathomless-escarpment-10744.herokuapp.com/parts`;

    const { data: allparts, isLoading , refetch } = useQuery(['allparts'], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
// console.log(allparts);
    if (isLoading) {
        return <Loading></Loading>
    }
    // delete------
    const id= deletes?._id;
    const handleDelete = () =>{

        const url =`https://fathomless-escarpment-10744.herokuapp.com/parts/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            toast('Your Order is Deleted');
            refetch()

        })
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
                       allparts.map((products , index)=><tr key={products._id}>
                       <th>{index + 1}</th>
                       <td>
            <div className="avatar">
                <div className="w-24 mask mask-hexagon object-scale-down h-20">
                    <img src={products.img} />
                </div>
            </div>
            </td>
            <td>{products.Name}</td>
            <td>{products.stock}</td>
            <td>${products.price}</td>
            <td>
            <label onClick={() => setDeletes(products)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-error">Delete</label>
            </td>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                            <div className="avatar">
                                                <div className="w-24 rounded">
                                                <img src={deletes?.img} />
                                                </div>
                                            </div>
                                <h3 className="font-bold text-lg"> Are You sure delete {deletes?.Name} this item!</h3>
                                <div className="modal-action">
                                <label htmlFor="delete-confirm-modal" className="btn btn-error" onClick={() =>handleDelete()}>Confirm</label>
                                <label htmlFor="delete-confirm-modal" className="btn bg-blue-600">withdrow</label>
                                </div>
                            </div>
                        </div>

                       </tr>)
                   }
                </tbody>
            </table>
        </div>
    </div>
    <ToastContainer/>
        </div>
    );
};

export default ManageProducts;