import React, { useState } from "react";
import { useQuery } from "react-query";
import Purchase from "../../Private/Purchase/Purchase";
import Loading from "../../Shared/Loading/Loading";
import PartsDetail from "./PartsDetail";

const Parts = () => {
  const url = `https://drone-manufacturer-website.vercel.app/parts`;
  const {
    data: parts,
    isLoading,
    refetch,
  } = useQuery(["parts"], () =>
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
    <div className="my-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 ">
        {parts?.slice(0, 6).map((part) => (
          <PartsDetail
            key={part._id}
            part={part}
            refetch={refetch}
          ></PartsDetail>
        ))}
      </div>
    </div>
  );
};

export default Parts;
