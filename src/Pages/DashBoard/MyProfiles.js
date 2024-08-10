import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import auth from "../../firebase.init";

const MyProfiles = () => {
  const [user] = useAuthState(auth);
  const name = user.displayName;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const imgStorageKey = "1e33af45180bab37c1ca530769c3342b";

  const updateProfile = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const imgUrl = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const email = data.email;
        console.log(email);
        if (result.success) {
          const img = result.data.url;
          const profile = {
            name: data.name,
            email: data.email,
            number: data.number,
            education: data.education,
            location: data.location,
            img: img,
          };
          fetch(
            `https://drone-manufacturer-website.vercel.app/users/${email}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(profile),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                toast.success("Update Your Profile");
                reset();
              } else {
                toast.error("Sorry your Profile can't updated");
              }
            });
        }
      });
  };
  // here load update user
  const [man, setMan] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(
        `https://drone-manufacturer-website.vercel.app/users?email=${user.email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            Navigate("/");
          }
          return res.json();
        })
        .then((data) => setMan(data[0]));
    }
  }, [user]);
  console.log(man);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 px-3">
        <div class="w-full mt-10 mx-auto max-w-xl rounded-lg bg-white dark:bg-gray-800 shadow-lg px-5 py-4 text-gray-800 dark:text-gray-50">
          <div class="w-full pt-1 text-center -mt-16 mx-auto">
            <a href="#" class="block relative">
              <img
                alt="profil"
                src={man.image}
                class="mx-auto object-cover rounded-full h-20 w-20 "
              />
            </a>
          </div>
          <div class="w-full">
            <div class="text-center mb-6">
              <p class="text-gray-800 dark:text-white text-xl font-medium">
                {user.displayName}
              </p>
              <p class="text-gray-400 text-xs">who i am?</p>
            </div>
            <div class="rounded-lg bg-pink-100 dark:bg-white p-2 w-full mb-4">
              <div class=" text-xm  text-gray-400 dark:text-black">
                <h1 className="font-bold text-2xl">About</h1>
                <div class="divider"></div>
                <div className="flex   mx-5">
                  <div>
                    <p class="font-bold">Email:</p>
                  </div>
                  <div className="mx-16">
                    <span class="  text-black dark:text-indigo-500 font-bold">
                      {user.email}
                    </span>
                  </div>
                </div>
                {man.number && (
                  <div className="flex  items-start mx-5">
                    <div>
                      <p class="font-bold">Number:</p>
                    </div>
                    <div className="mx-11">
                      <span class=" text-left text-black dark:text-indigo-500 font-bold ">
                        {man.number}
                      </span>
                    </div>
                  </div>
                )}
                {man.education && (
                  <div className="flex  items-start mx-5">
                    <div>
                      <p class="font-bold">Education:</p>
                    </div>
                    <div className="mx-7">
                      <span class=" text-left text-black dark:text-indigo-500 font-bold ">
                        {man.education}
                      </span>
                    </div>
                  </div>
                )}

                {man.location && (
                  <div className="flex  items-start mx-5">
                    <div>
                      <p class="font-bold">Location:</p>
                    </div>
                    <div className="mx-10">
                      <span class=" text-left  text-black dark:text-indigo-500 font-bold ">
                        {man.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <label
            htmlFor="my-drawer-4"
            type="button"
            class="py-3 mt-10 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Edit Profile
          </label>
        </div>

        {/* here another section */}
        <div className="drawer bg-base-100">
          <input
            id="my-drawer-4"
            type="checkbox"
            className="drawer-toggle bg-base-100"
          />
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-full bg-base-100 text-base-content">
              <form onSubmit={handleSubmit(updateProfile)}>
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
                        message: "Name is Required",
                      },
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
                {/*Education */}
                <div className="form-control w-full max-w-xs mx-auto ">
                  <label className="label">
                    <span className="label-text">Education</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ex:-AsianUnitedNorthMedical University"
                    className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    {...register("education", {
                      required: {
                        value: true,
                        message: "Education is Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.education?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.number.message}
                      </span>
                    )}
                  </label>
                </div>
                {/* Location */}
                <div className="form-control w-full max-w-xs mx-auto ">
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Settlement: city, town, village site"
                    className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    {...register("location", {
                      required: {
                        value: true,
                        message: "Location is Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.location?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.number.message}
                      </span>
                    )}
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
                  value="Update Profile"
                />
              </form>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyProfiles;
