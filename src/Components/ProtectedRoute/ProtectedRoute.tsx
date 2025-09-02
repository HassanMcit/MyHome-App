import { Navigate } from "react-router";
import type { TypeChildren } from "../../Type";
import useUserDataWithRouter from "../CustomeHook/useUserDataWithRouter/useUserDataWithRouter";


export default function ProtectedRoute({children}:TypeChildren) {
  
    const [{token}] = useUserDataWithRouter();

  if(token) {
    return (
    <div>{children}</div>
  )
  } else {
    return <Navigate to={'/login'}></Navigate>
  }
}
