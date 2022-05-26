import React from 'react';
import { ToastContainer } from 'react-toastify';

const ManageProductDetails = ({ products, refetch ,index }) => {
    const {img , Name , price , stock} = products;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>
            <div class="avatar">
                <div class="w-24 mask mask-hexagon object-scale-down h-20">
                    <img src={img} />
                </div>
            </div>
            </td>
            <td>{Name}</td>
            <td>{stock}</td>
            <td>${price}</td>
            {/* <td>
                {(orders.paid) && <span className='text-success font-bold'>Paid</span>}
                {(!orders.paid) && <span className='text-success font-bold'>Unpaid</span>}
            </td> */}
            {/* <td>
                {(orders.paid && !status) && <button
                onClick={()=>handleShipped(orders._id)}
                className="btn btn-xs bg-cyan-400 border-0 text-white">Pandding</button>}
                {(orders.paid && status) && <span className='text-cyan-400 font-bold'>Shipped</span>}
            </td> */}
            <ToastContainer/>
        </tr>
    );
};

export default ManageProductDetails;