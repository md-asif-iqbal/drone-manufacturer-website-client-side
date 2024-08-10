import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const imgStorageKey = "4a61042a9b5e9768554933fea17bbd17";

  const addProduct = async (data) => {
    const min = parseInt(data.min);
    const stock = parseInt(data.stock);
    const price = parseInt(data.price);

    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const imgUrl = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const product = {
            Name: data.Name,
            img: img,
            description: data.description,
            min: min,
            stock: stock,
            price: price,
          };
          fetch(
            "https://drone-manufacturer-website.vercel.app/parts",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(product),
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result.success) {
                toast.success("Congratsss your Product is added");
                reset();
              } else {
                toast.error("Sorry Your Product is not added");
              }
            });
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(addProduct)}>
        <div className="form-control w-full max-w-xs mx-auto ">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full max-w-xs"
            {...register("Name", {
              required: {
                value: true,
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

        <div className="form-control w-full max-w-xs mx-auto">
          <label className="label">
            <span className="label-text">Minimum Sell Piece</span>
          </label>
          <input
            type="number"
            placeholder="add mimium piece"
            className="input input-bordered w-full max-w-xs"
            {...register("min", {
              required: {
                value: true,
                message: "minimum product require",
              },
            })}
          />
          <label className="label">
            {errors.number?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control w-full max-w-xs mx-auto">
          <label className="label">
            <span className="label-text">Available Stock</span>
          </label>
          <input
            type="number"
            placeholder="add Available Stock"
            className="input input-bordered w-full max-w-xs"
            {...register("stock", {
              required: {
                value: true,
                message: "Stock product require",
              },
            })}
          />
          <label className="label">
            {errors.number?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs mx-auto">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            placeholder="Per Piece"
            className="input input-bordered w-full max-w-xs"
            {...register("price", {
              required: {
                value: true,
                message: "price is require",
              },
            })}
          />
          <label className="label">
            {errors.number?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        {/* Review Text Area */}
        <div className="form-control w-full max-w-xs mx-auto ">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="description"
            rows="5"
            cols="40"
            typeof="text"
            {...register("description", {
              required: {
                value: true,
                message: "Review is Required",
              },
            })}
          ></textarea>
          <label className="label">
            {errors.description?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control w-full max-w-xs mx-auto">
          <label className="label">
            <span className="label-text">Products Photo</span>
          </label>
          <input
            type="file"
            className="input  w-full max-w-xs"
            {...register("img", {
              required: {
                value: true,
                message: "Image is Required",
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

        <input
          className="btn w-full max-w-xs text-white bg-red-500 border-0 "
          type="submit"
          value="Add Products"
        />
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
