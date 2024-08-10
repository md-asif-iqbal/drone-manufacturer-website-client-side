import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ManageProductDetails = ({ products, refetch, index }) => {
  const [deletes, setDeletes] = useState(null);
  console.log(deletes?._id, deletes?.img);
  const { _id, img, Name, price, stock } = products;
  const id = deletes?._id;
  const handleDelete = () => {
    const url = `https://drone-manufacturer-website.vercel.app/parts/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast("Your Order is Deleted");
        refetch();
      });
  };
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <div className="avatar">
            <div className="w-24 mask mask-hexagon object-scale-down h-20">
              <img src={img} />
            </div>
          </div>
        </td>
        <td>{Name}</td>
        <td>{stock}</td>
        <td>${price}</td>
        <td>
          <label
            onClick={() => setDeletes(products)}
            htmlFor="delete-confirm-modal"
            className="btn btn-xs btn-error"
          >
            Delete
          </label>
        </td>

        <ToastContainer />
      </tr>
      <input
        type="checkbox"
        id="delete-confirm-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="avatar">
            <div className="w-24 rounded">
              <img src={deletes?.img} />
            </div>
          </div>
          <h3 className="font-bold text-lg">
            {" "}
            Are You sure delete {deletes?.Name} this item!
          </h3>
          <div className="modal-action">
            <label
              htmlFor="delete-confirm-modal"
              className="btn btn-error"
              onClick={() => handleDelete()}
            >
              Confirm
            </label>
            <label htmlFor="delete-confirm-modal" className="btn bg-blue-600">
              withdrow
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProductDetails;

// <label htmlFor="my-modal-6" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4
// focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5
// text-center mr-2 mb-2">DELETE</label>
