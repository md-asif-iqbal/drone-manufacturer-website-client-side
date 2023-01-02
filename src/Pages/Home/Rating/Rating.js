import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import ReviewDetails from "./ReviewDetails";

const Rating = () => {
  const {
    data: review,
    isLoading,
    refetch,
  } = useQuery(["review"], () =>
    fetch(`https://drone-parts-server-side.vercel.app/reviews`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-purple-700 mt-7 mb-5">
        Review Our Customer{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 ">
        {review.map((reviews) => (
          <ReviewDetails
            key={reviews._id}
            reviews={reviews}
            refetch={refetch}
          ></ReviewDetails>
        ))}
      </div>
    </div>
  );
};

export default Rating;
