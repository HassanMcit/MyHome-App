import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { HuobiToken } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import axios, { type AxiosResponse } from "axios";
import type { Root, User } from "../../Type";
import useUserDataWithRouter from "../CustomeHook/useUserDataWithRouter/useUserDataWithRouter";
import { toast } from "react-toastify";

export default function AppNavbar() {

  const [{ token, setToken }, router] = useUserDataWithRouter();

  const [userDetails, setUserDetails] = useState<User | null>(null);

  const inputUpload = useRef<null | HTMLInputElement>(null);

  const location = useLocation();
  
  function handleLogout() {
    localStorage.clear();
    setToken(localStorage.getItem("token"));
    router("/login");
  }

  function getUserDetails() {
    axios
      .get<Root>(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: {
          token,
        },
      })
      .then(function ({ data: { user } }: AxiosResponse<Root>) {
        setUserDetails(user);
        // setLoading(false);
      });
  }

    useEffect(() => {
    getUserDetails();
  }, []);

  function handleOpenFile() {
    inputUpload.current?.click();
  }

  function handleUploadImage() {
    // setLoading(true);
    if(inputUpload.current?.files?.length) {
      const file = inputUpload.current?.files[0];
      const dataForm = new FormData();
      dataForm.append("photo", file);
      toast.promise(axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, dataForm, {
        headers: {
          token
        }
      }).then(() => {
        getUserDetails()
        // setLoading(false)
      }).catch(error => console.log(error)), {
        pending: "Please Wait...",
        success: "Profile Changed Successful 🎉",
        error: "Please Try Again 😢"
      })
    }
  }




  return (
    <>
   
    <Navbar maxWidth="xl" className="bg-indigo-400 px-4 sm:px-6 lg:px-8">
      <NavbarBrand className="cursor-pointer">
        <HuobiToken size="35" color="#FFF" />
        <p className="font-bold  text-white">HA Home</p>
      </NavbarBrand>

      <input
        type="file"
        ref={inputUpload}
        className="hidden"
        onChange={handleUploadImage}
      />

      {token && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={location.pathname === '/'} >
            <Link className={`${location.pathname === '/' ? 'bg-white text-indigo-500 rounded-2xl' : 'text-white'} p-2 text-xl`} color="foreground" to="/" >
              Tasks
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === '/expenses'} >
            <Link
              className={`${location.pathname === '/expenses' ? 'bg-white text-indigo-500 rounded-2xl' : 'text-white'} p-2 text-xl`}
              aria-current="page"
              color="secondary"
              to="/expenses"
            >
              Expenses
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      {token && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform cursor-pointer"
                color="default"
                name=""
                size="sm"
                src={userDetails?.photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                textValue={`Name: ${userDetails?.name || ""}, Email: ${
                  userDetails?.email || ""
                }`}
                key="profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">
                  <span className="font-bold">Name:</span> {userDetails?.name}
                </p>
                <p className="font-semibold">
                  <span className="font-bold">Email:</span> {userDetails?.email}
                </p>
              </DropdownItem>

              <DropdownItem
                key="profileImage"
                textValue="Change Profile Image"
                onClick={handleOpenFile}
              >
                Change Profile Image
              </DropdownItem>

              <DropdownItem
                key="Tasks"
                className="block sm:hidden"
                textValue="Tasks"
                
              >
                <Link to={'/'}>Task</Link>
              </DropdownItem>

              <DropdownItem
                key="Expenses"
                className="block sm:hidden"
                textValue="Expenses"
              >
                <Link to="/expenses">Expenses</Link>
              </DropdownItem>

              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>

      
    </>
  );
}
