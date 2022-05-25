import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import auth from '../../firebase.init';

const MyProfiles = () => {
    const [user] = useAuthState(auth);
    const name= user.displayName;
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    return (
        
        <div >
            <h1>This is My Profile</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 px-3'>
            <div class="card w-full bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <div class="avatar placeholder">
                        {
                            user.img?
                            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        </div> :
                        <div class="bg-neutral-focus text-neutral-content ring ring-primary ring-offset-base-100 rounded-full w-24">
                            <span class="text-3xl font-bold">{name.length<50?user.displayName.slice(0,1):user.displayName}</span>
                        </div>
                        }
                    </div>
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">{user.displayName}</h2>
                    <p>{user.email}</p>
                    <p>your number</p>
                    <p>education</p>
                    <p>Location</p>
                    <div class="card-actions">
                    <label for="my-drawer-4" class="drawer-button btn btn-primary">Edit Profile</label>
                    </div>
                </div>
            </div>
            <div class="drawer bg-base-100">
                <input id="my-drawer-4" type="checkbox" class="drawer-toggle bg-base-100" /> 
                <div class="drawer-side">
                    <label for="my-drawer-4" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-full bg-base-100 text-base-content">
                        <form  onSubmit={handleSubmit()}>
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
                            {/* Review Text Area */}
                            <div className="form-control w-full max-w-xs mx-auto ">
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
            
        </div>
    );
};

export default MyProfiles;