import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import ManageOrdersDetails from "./ManageOrdersDetails";

const ManageOrders = () => {
  const url = `https://drone-parts-server-side.vercel.app/allorders`;

  const {
    data: allOrders,
    isLoading,
    refetch,
  } = useQuery(["allorders"], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  console.log(allOrders);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">All Orders: {allOrders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Buyer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Pay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((orders, index) => (
              <ManageOrdersDetails
                key={orders._id}
                orders={orders}
                index={index}
                refetch={refetch}
              ></ManageOrdersDetails>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
