import { useContext, type ReactNode } from "react";
import { UserDataShared } from "../Context/UserContext/UserDataProvider";
import { Navigate } from "react-router";

type ProtectedRouteProps  = {
    children: ReactNode
}


export default function ProtectedRoute({children}:ProtectedRouteProps) {
  const userData = useContext(UserDataShared);
  
  if(!userData) {
    throw new Error('hamsa sahdasdh')
  }

  const {token} = userData;

  if(token) {
    return (
    <div>{children}</div>
  )
  } else {
    return <Navigate to={'/login'}></Navigate>
  }
}
