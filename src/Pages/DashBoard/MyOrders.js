import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';

const MyOrders = () => {
    const navigate = useNavigate()
    const [orders, setOrders ] = useState([]);
    const [deletes , setDeletes] = useState(null);
    const [user] = useAuthState(auth);
    
    
    useEffect(() => {
        if (user) {
            fetch(`https://fathomless-escarpment-10744.herokuapp.com/purchase?buyerEmail=${user.email}` ,{
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
     
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/');
                }
                return res.json()
            })
                .then(data => setOrders(data));
        }

    }, [user]);
    const id= deletes?._id;
    const handleCencelOrder = () =>{
        
        console.log('yes');
        const url =`https://fathomless-escarpment-10744.herokuapp.com/purchase/${id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            toast('Your Order is Cenceled');

            
        })
           
        
    }
   
    return (
        <div>
            <h2>My Orders: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parts Image</th>
                            <th>Parts Title</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Payment</th>
                            <th>Cencel Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((p, index) =><tr key={p._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="object-scale-down w-full h-16 rounded">
                                            <img src={p?.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{p.purchaseName}</td>
                                <td>{p.purchaseQuantity}</td>
                                <td>{p.totalPrice}</td>
                                <td>{(p.totalPrice && !p.paid) && <Link to={`/dashboard/payment/${p._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}
                                {(p.totalPrice && p.paid) && <span className='text-success font-bold'>paid</span>}
                                </td>
                                <td>
                                    {/*  */}
                                    {(p.totalPrice && !p.paid) && <label onClick={() => setDeletes(p)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-error">Delete</label>}
                
                                </td>
                                <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                            <div className="avatar">
                                                <div className="w-24 rounded">
                                                <img src={deletes?.image} />
                                                </div>
                                            </div>
                                <h3 className="font-bold text-lg"> Are You sure delete {deletes?.purchaseName} this item!</h3>
                                <div className="modal-action">
                                <label htmlFor="delete-confirm-modal" className="btn btn-error" onClick={() =>handleCencelOrder()}>Confirm</label>
                                <label htmlFor="delete-confirm-modal" className="btn bg-blue-600">withdrow</label>
                                </div>
                            </div>
                        </div>
                            </tr>)
                        }
                        
                        
                        
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default MyOrders;