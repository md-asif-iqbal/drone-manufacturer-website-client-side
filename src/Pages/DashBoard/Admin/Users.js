import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import AdminUsersRow from "./AdminUsersRow";

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("https://drone-parts-server-side.vercel.app/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(users);
  return (
    <div>
      <h2 className="text-2xl">All Users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <AdminUsersRow
                key={user._id}
                user={user}
                refetch={refetch}
              ></AdminUsersRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
