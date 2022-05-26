import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';

const MyOrders = () => {
    const navigate = useNavigate()
    const [orders, setOrders ] = useState([]);
    const [deletes , setDeletes] = useState();
    const [user] = useAuthState(auth);
    console.log(deletes);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8000/purchase?buyerEmail=${user.email}` ,{
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

    const handleCencelOrder = id =>{
        
            const url =`http://localhost:8000/purchase/${id}`;
            fetch(url, {
                method: 'DELETE'
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
                                            <img src={p.image} />
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
                                    {(p.totalPrice && !p.paid) && <label htmlFor="my-modal-6" class="btn btn-xs btn-error" >Cancel</label>}
                                    {(p.totalPrice && p.paid) && <button className='btn btn-xs btn-error' disabled>Cancel</button>}
                                </td>
                                <input type="checkbox" id="my-modal-6" class="modal-toggle" />
                            <div class="modal modal-bottom sm:modal-middle">
                            <div class="modal-box">
                            <div class="avatar">
                                <div class="w-24 rounded">
                                    <img src={p.image} />
                                </div>
                                </div>
                                <h3 class="font-bold text-lg"> Are You sure delete {p.purchaseName} this item!</h3>
                                <div class="modal-action">
                                <label for="my-modal-6" class="btn btn-error" onClick={()=>handleCencelOrder(p._id)}>Confirm</label>
                                <label for="my-modal-6" class="btn bg-blue-600">withdrow</label>
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