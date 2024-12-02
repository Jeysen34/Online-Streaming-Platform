import React from "react";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";

function Authentication() {
  return (
    <div className="row">
      <div className="col-md-6">
        <UserLogin />
      </div>
      <div className="col-md-6">
        <UserRegister />
      </div>
    </div>
  );
}

export default Authentication;
