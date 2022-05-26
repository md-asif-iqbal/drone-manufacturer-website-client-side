import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import CheckoutForm from './CheckOutForm';

const  stripePromise = loadStripe('pk_test_51L1XB5H61fNE2hoY64h8CCh1YNRbrJ3qHKQYEHrs4WnmKiPR1toY0DxvQZZG1HWrLm36JQZoXnsNLkAjJIQ7WTnW00ih4Ttx4F')
const Payments = () => {
    const {id} = useParams();
    const url = `http://localhost:8000/purchase/${id}`;

    const { data: order, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h4>hello :{id}</h4>
            <div>
            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div class="card-body">
                    <p className="text-success text-2xl font-bold">Hello, {order.buyer}</p>
                    <h2 class="card-title text-xl mx-auto ">Please Pay for {order.purchaseName}</h2>
                    <p>Your Quantity: <span className='text-orange-700'>{order.purchaseQuantity}</span></p>
                    <p>Please pay: ${order.totalPrice}</p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
            
        </div>
    );
};

export default Payments;