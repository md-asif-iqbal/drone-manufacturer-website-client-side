import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../firebase.init';

const AddReviews = () => {
    const [user]=useAuthState(auth);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imgStorageKey ='bf91d93f830c6557941ede306898bbb3';

    const handleReview = async data=>{
        // console.log(data);
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
            if(result.success){
                const img = result.data.url;
                const reviews = {
                    name: data.name,
                    email: data.email,
                    review: data.review,
                    img: img
                }
                fetch('https://fathomless-escarpment-10744.herokuapp.com/review', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(reviews)
                })
                .then(res =>res.json())
                .then(inserted =>{
                    if(inserted.insertedId){
                        toast.success('Thanks For Reviews')
                        reset();
                    }
                    else{
                        toast.error('Sorry your Review bot currect');
                    }
                })

            }
            
        })


    }


    return (
        <div>
            <div>
            <h2 className="text-2xl">Add your Review</h2>
            <form  onSubmit={handleSubmit(handleReview)}>

                <div className="form-control w-full max-w-xs mx-auto ">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        
                        value={user.displayName}
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs mx-auto">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        className="input input-bordered w-full max-w-xs"
                        {...register("email")}
                    />
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


                <div className="form-control w-full max-w-xs mx-auto">
                    <label className="label">
                        <span className="label-text">Your Photo</span>
                    </label>
                    <input
                        type="file"
                        className="input  w-full max-w-xs"
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
               
                

                <input className='btn w-full max-w-xs text-white bg-red-500 border-0 ' type="submit" value="Add Review" />
            </form>
            <ToastContainer/>
        </div>
        </div>
    );
};

export default AddReviews;