import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';

const MyProfiles = () => {
    
    const [user] = useAuthState(auth);
    const name= user.displayName;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgStorageKey ='1e33af45180bab37c1ca530769c3342b';

    const updateProfile = async data=>{
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image' , image);
        const imgUrl = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(imgUrl,{
            method: 'POST',
            body: formData
        })
        .then(res=>res.json())
        .then(result =>{
            const email = data.email
            console.log(email);
            if(result.success){
                const img = result.data.url;
                const profile = {
                    name: data.name,
                    email: data.email,
                    number: data.number,
                    education: data.education,
                    location: data.location,
                    img: img
                }
                fetch(`http://localhost:8000/users/${email}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(profile)
                })
                .then(res =>res.json())
                .then(data =>{
                    if(data.modifiedCount>0){
                        toast.success('Update Your Profile')
                        reset();
                    }
                    else{
                        toast.error("Sorry your Profile can't updated");
                    }
                })

            }
            
        })

    }
    // here load update user
    const [man, setMan ] = useState([]);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8000/users?email=${user.email}` ,{
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
     
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    Navigate('/');
                }
                return res.json()
            })
                .then(data => setMan(data[0]));
        }

    }, [user])
console.log(man);
    


    return (
        
        <div >
            <h1>This is My Profile</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 px-3'>
            <div className="card w-full bg-base-100 shadow-xl mb-5">
                <figure className="px-10 pt-10">
                    <div className="avatar placeholder">
                        {
                            man.image?
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={man.image} />
                        </div> :
                        <div className="bg-neutral-focus text-neutral-content ring ring-primary ring-offset-base-100 rounded-full w-24">
                            <span className="text-3xl font-bold">{name.length<50?user.displayName.slice(0,1):user.displayName}</span>
                        </div>
                        }
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.displayName}</h2>
                    <p>{user.email}</p>
                    <p>{man.number}</p>
                    <p>{man.education}</p>
                    <p> {man.location}</p>
                    <div className="card-actions">
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Edit Profile</label>
                    </div>
                </div>
            </div>
            <div className="drawer bg-base-100">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle bg-base-100" /> 
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-full bg-base-100 text-base-content">
                        <form  onSubmit={handleSubmit(updateProfile)}>
                            {/* name */}
                            <div className="form-control w-full max-w-xs mx-auto ">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })}
                                />
                            </div>
                            {/* email */}
                            <div className="form-control w-full max-w-xs mx-auto">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    {...register("email")}
                                />
                            </div>
                            {/* number */}
                            <div className="form-control w-full max-w-xs mx-auto">
                                <label className="label">
                                    <span className="label-text">Add Number</span>
                                </label>
                                <input
                            type="number"
                            placeholder="Phone number 013-0000"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            {...register("number", {
                                required: {
                                    value: true,
                                    message: 'Number is Required'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'Must be 5 characters or longer'
                                }
                            })}
                        />
                        
                        <label className="label">
            
                            {errors.number?.type === 'required' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
                            {errors.number?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
                        </label>
                            </div>
                            {/*Education */}
                            <div className="form-control w-full max-w-xs mx-auto ">
                                <label className="label">
                                    <span className="label-text">Education</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='ex:-AsianUnitedNorthMedical University'
                                    className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    {...register("education", {
                                        required: {
                                            value: true,
                                            message: 'Education is Required'
                                        }
                                    })}
                                />
                                <label className="label">
            
            {errors.education?.type === 'required' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
            
        </label>
                            </div>
                            {/* Location */}
                            <div className="form-control w-full max-w-xs mx-auto ">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder='Settlement: city, town, village site'
                                    className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    {...register("location", {
                                        required: {
                                            value: true,
                                            message: 'Location is Required'
                                        }
                                    })}
                                />
                                <label className="label">
            
            {errors.location?.type === 'required' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
            
        </label>
                            </div>
                            {/* image section */}
                            <div className="form-control w-full max-w-xs mx-auto">
                                <label className="label">
                                    <span className="label-text">Add your Photo</span>
                                </label>
                                <input
                                    type="file"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Image is Required'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <input className='btn w-full max-w-xs text-white bg-red-500 border-0 ' type="submit" value="Update Profile" />
                        </form>
                    </ul>
                </div>
            </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default MyProfiles;
{/* <div className="form-control w-full max-w-xs mx-auto ">
                                <label className="label">
                                    <span className="label-text">Write Down Your Review</span>
                                </label>
                                <textarea className="appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Enter your review"  rows="5" cols="40"
                                typeof='text'
                                {...register("review", {
                                    required: {
                                        value: true,
                                        message: 'Review is Required'
                                    }
                                })}
                                ></textarea>
                                <label className="label">
                                    {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div> */}