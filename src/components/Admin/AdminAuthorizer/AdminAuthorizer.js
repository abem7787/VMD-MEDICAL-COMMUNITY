import React from "react";

import { Navigate } from "react-router-dom";

export const AdminAuthorizer = ({ children })=>{

    const token = localStorage.getItem("admintoken");

    if(!token){
        return <Navigate to={"/adminlogin"} replace={true}></Navigate>;
    }
    return children;

}
