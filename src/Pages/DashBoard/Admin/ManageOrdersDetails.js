import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const ManageOrdersDetails = ({ orders, refetch ,index }) => {
    const {buyer , purchaseName , purchaseQuantity , paid  , status} = orders;
    console.log(status);
    const handleShipped = id =>{
        console.log(id);
        const url =`https://fathomless-escarpment-10744.herokuapp.com/allorders/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if(res.status === 403){
                        toast.error('Order is Not Shipped');
                    }
                    return res.json()})
                .then(data => {
                    if (data.modifiedCount > 0) {
                        console.log(data);
                        refetch();
                        toast.success(`Order has Shipped`);
                    }
                })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{buyer}</td>
            <td>{purchaseName}</td>
            <td>{purchaseQuantity}</td>
            <td>
                {(orders.paid) && <span className='text-success font-bold'>Paid</span>}
                {(!orders.paid) && <span className='text-success font-bold'>Unpaid</span>}
            </td>
            <td>
                {(orders.paid && !status) && <button
                onClick={()=>handleShipped(orders._id)}
                className="btn btn-xs bg-cyan-400 border-0 text-white">Pandding</button>}
                {(orders.paid && status) && <span className='text-cyan-400 font-bold'>Shipped</span>}
            </td>
            <ToastContainer/>
        </tr>
    );
};

export default ManageOrdersDetails;