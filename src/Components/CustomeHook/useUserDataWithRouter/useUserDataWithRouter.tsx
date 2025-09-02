import { useContext } from "react"
import { UserDataShared } from "../../Context/UserContext/UserDataProvider"
import { useNavigate, type NavigateFunction } from "react-router";
import type { UserDataType } from "../../../Type";

export default function useUserDataWithRouter():[UserDataType, NavigateFunction] {

    const userData = useContext(UserDataShared);
    const router = useNavigate();

    if(!userData) throw new Error("useUserDataWithRouter must be used inside UserDataProvider");

  return [userData, router]
}
