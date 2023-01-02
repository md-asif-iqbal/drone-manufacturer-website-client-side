import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading/Loading";
import AllPartsDetails from "./AllPartsDetails";

const AllParts = () => {
  const url = `https://drone-parts-server-side.vercel.app/parts`;
  const {
    data: allParts,
    isLoading,
    refetch,
  } = useQuery(["allparts"], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="carousel w-full">
      <div className="carousel-item w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-3 ">
        {allParts.map((part) => (
          <AllPartsDetails
            key={part._id}
            part={part}
            refetch={refetch}
          ></AllPartsDetails>
        ))}
      </div>
    </div>
  );
};

export default AllParts;
