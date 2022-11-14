import React from "react";
import UserList from "../components/UserList";

const Users = (users) => {
  const USER = [
    {
      id: "1",
      image: "https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg?quality=85&w=2036",
      name: "Terry",
      placeCount: "3",
    },
  ];
  return <UserList items={[...users, ...USER]} />;
};

export default Users;
