import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePartId from "../../../Hooks/usePartId";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useForm } from "react-hook-form";
import { async } from "@firebase/util";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../../Shared/Loading/Loading";
const Purchase = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const nevigate = useNavigate();
  const [prices, setPrices] = useState();
  const [quant, setQuant] = useState();
  const { id } = useParams();
  const [user, email] = useAuthState(auth);
  // console.log(user.displayName);

  const [products] = usePartId(id);
  const { img, Name, description, stock, min: minimum, price, _id } = products;

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { name, email, quantity, address, number } = data;
    const piece = parseInt(quantity);

    const purchase = {
      purchaseId: _id,
      purchaseName: Name,
      purchaseQuantity: piece,
      image: img,
      buyer: name,
      buyerEmail: email,
      buyerNumber: number,
      buyerAddress: address,
      totalPrice: prices,
    };
    // console.log(purchase);
    fetch(
      "https://drone-manufacturer-website.vercel.app/purchase",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(purchase),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Your Order Is confirm pls Pay");
          event.target.reset();
        } else {
          toast.error("sorry your order is not ready please check your order");
        }
      });

    // console.log(newStock);
    //         const url = `https://drone-manufacturer-website.vercel.app/parts/${id}`
    //         fetch(url , {
    //             method: 'PUT',
    //             headers: {
    //                 'content-type':'application/json',
    //             },
    //             body: JSON.stringify({newStock}),
    //         })
    //         .then(res=> res.json())
    //         .then(result =>{
    //             console.log(result);
    //             event.target.reset();

    //         })
  };

  let errorElement;

  const validate = (value) => {
    const newValue = parseInt(value);
    setQuant(newValue);
    const totalPrice = parseInt(price * newValue);
    setPrices(totalPrice);
    // console.log('Validating Here!' , totalPrice);
  };
  if (quant < minimum) {
    errorElement = (
      <span className="label-text-alt text-red-500">
        Minimum Order is ${minimum}
      </span>
    );
  }
  if (quant >= stock) {
    errorElement = (
      <span className="label-text-alt text-red-500">
        Maximum Order is ${stock}
      </span>
    );
  }
  return (
    <div>
      <div className="flex bg-white mt-9 shadow-lg rounded-lg">
        <div className="w-1/3 bg-cover bg-landscape ml-5">
          <img src={img} alt="" />
        </div>
        <div className="ml-5">
          <div className="w-2/3 p-4 text-left ">
            <h1 className="text-gray-900 font-bold text-2xl">{Name}</h1>
            <p className="mt-2 text-gray-600 text-sm">
              Description: {description}
            </p>
            <p className="text-gray-600">
              Minimum order:{" "}
              <span className="text-yellow-400 font-bold">{minimum}</span> piece
            </p>
            <p className="text-gray-600">
              Stock : <span className="font-bold">{stock} piece</span>
            </p>
            <h1 className="text-gray-700 ">
              Price:{" "}
              <span className="font-bold text-xl">${price} Per Piece</span>
            </h1>
            <div className="flex item-center mt-2 mb-2">
              <svg
                className="w-5 h-5 fill-current text-amber-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
              </svg>
              <svg
                className="w-5 h-5 fill-current text-amber-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
              </svg>
              <svg
                className="w-5 h-5 fill-current text-amber-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
              </svg>
              <svg
                className="w-5 h-5 fill-current text-amber-400"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
              </svg>

              <svg
                className="w-5 h-5 fill-current text-gray-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
              </svg>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="custom-number-input h-10 w-40 mb-10 ">
                <label className="w-full text-gray-700 text-sm font-semibold">
                  QUANTITY
                </label>
                <div className=" w-full  rounded-lg relative bg-transparent mt-1 r">
                  <input
                    type="number"
                    className="outline-none rounded focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    placeholder={minimum}
                    min={minimum}
                    max={stock}
                    {...register("quantity", {
                      onChange: (e) => validate(e.target.value),
                      required: {
                        value: true,
                        message: `This field must reqiured`,
                      },
                      min: {
                        value: minimum,
                        message: `Minimum Order is ${minimum}`,
                      },
                      max: {
                        value: stock,
                        message: `Maximum Order  is ${stock}`,
                      },
                    })}
                  />

                  <label className="label">
                    {errors.quantity?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.quantity.message}
                      </span>
                    )}
                    {errors.quantity?.type === "min" && (
                      <span className="label-text-alt text-red-500">
                        {errors.quantity.message}
                      </span>
                    )}
                    {errors.quantity?.type === "max" && (
                      <span className="label-text-alt text-red-500">
                        {errors.quantity.message}
                      </span>
                    )}
                    {errorElement}
                  </label>
                </div>
              </div>
              <div className="custom-number-input h-10 w-full">
                <label className="w-full text-gray-700 text-sm font-semibold">
                  TOTAL PRICE = {prices ? prices : 0}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">What's your name ?</span>
                </label>

                <input
                  type="text"
                  placeholder="Your Name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={user.displayName}
                  {...register("name", {
                    required: {
                      message: "Name is Required",
                    },
                  })}
                />

                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs relative z-0 group">
                <label className="label">
                  <span className="label-text">What's your email ?</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={user.email}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...register("email", {
                    required: {
                      message: "Email is Required",
                    },
                    pattern: {
                      message: "Provide a valid Email",
                    },
                  })}
                />
              </div>

              <div className="form-control w-full max-w-xs relative z-0 group">
                <label className="label">
                  <span className="label-text"> Enter your Number</span>
                </label>
                <input
                  type="number"
                  placeholder="Phone number (013-4567-8901)"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Number is Required",
                    },
                    minLength: {
                      value: 5,
                      message: "Must be 5 characters or longer",
                    },
                  })}
                />

                <label className="label">
                  {errors.number?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.number.message}
                    </span>
                  )}
                  {errors.number?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.number.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs relative z-0 group">
                <label className="label">
                  <span className="label-text">
                    What's your current Address?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="street 3202/bd..."
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is Required",
                    },
                  })}
                />

                <label className="label">
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                </label>
              </div>

              <input
                disabled={quant < minimum || quant >= stock}
                className="btn w-full border-0 bg-red-500 max-w-xs text-white"
                type="submit"
                value="Order Confirm"
              />
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
