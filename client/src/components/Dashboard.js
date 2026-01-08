import React from "react";
import Tonavigation from "./Tonavigation";
import { useSelector } from "react-redux";

function Dashboard() {
  let memberData = useSelector((store) => {
    return store.memberData;
  });
  console.log(memberData);
  return (
    <div>
      <Tonavigation />
      <h1>Dashboard</h1>
      <h1>
        {memberData.firstname} {memberData.lastname}
      </h1>
      <h2>{memberData.email}</h2>
      <img src={`/Profilepics/${memberData.profile}`} alt="Profile Pic" />
    </div>
  );
}

export default Dashboard;
