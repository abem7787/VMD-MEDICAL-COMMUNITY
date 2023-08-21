import React from "react";

import { Navigate } from "react-router-dom";

export const UserAuthorizer = ({ children })=>{

    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to={"/UserLogin"} replace={true}></Navigate>;
    }
    return children;

}
