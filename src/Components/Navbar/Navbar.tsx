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
import { Link, useLocation } from "react-router";
import useUserDataWithRouter from "../CustomeHook/useUserDataWithRouter/useUserDataWithRouter";
import Loading from "../Loading/Loading";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import type { Root, User } from "../../Type";
import { toast } from "react-toastify";

export default function AppNavbar() {

  const [{ token, setToken, setLoading, loading }, router] = useUserDataWithRouter();

  const location = useLocation();

  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  const inputUpload = useRef<HTMLInputElement | null >(null);
  
  function handleLogout() {
    localStorage.clear();
    setToken(localStorage.getItem("token"));
    router("/login");
  }

   function getUserDetails() {
    setLoading(true)
    toast.promise( 
      axios.get<Root>(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: {
          token
        }
      }).then(response => {
        setUserDetails(response.data.user)
        setUserPhoto(`${response.data.user.photo}`);
        console.log('Updated photo URL:', response.data.user.photo);
        console.log("User Data:", response.data);
        return response?.data;
      }).finally(() => setLoading(false)), {
        pending: "Please Wait...",
        success: {
          render({data}) {
            return data.message;
          }
        },
        error: "Failed to fetch user data 😢"
      })
  }


  function handleImageUpload() {
  if (inputUpload?.current?.files?.length) {
    const file = inputUpload.current.files[0];
    setUserPhoto(URL.createObjectURL(file)); // مؤقت لعرض الصورة

    const dataForm = new FormData();
    dataForm.append("photo", file);

    axios.put("https://linked-posts.routemisr.com/users/upload-photo", dataForm, {
      headers: { token }
    })
    .then(() => {
      getUserDetails(); // هنا بنجيب الصورة الجديدة من السيرفر
    })
    .catch(err => console.error(err));
  }
}

  

  useEffect(() => {
    getUserDetails();
  }, []);


  return (
    <>
   
    {loading ? <Loading/> : <Navbar maxWidth="xl" className="bg-indigo-400 px-4 sm:px-6 lg:px-8">
      <NavbarBrand as={Link} to='/' className="cursor-pointer">
        <HuobiToken size="35" color="#FFF" />
        <p className="font-bold  text-white">HA Home</p>
      </NavbarBrand>


      <input type="file" onChange={handleImageUpload} hidden ref={inputUpload}/>


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
                src={userDetails?.photo || ''}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                textValue={`Name: ""}, Email:`}
                  // userDetails?.email || ""
                // }`}
                key="profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">
                  <span className="font-bold">Name:</span> {userDetails?.name} 
                </p>
                <p className="font-semibold">
                  <span className="font-bold">Email: {userDetails?.email} </span> 
                </p>
              </DropdownItem>

              <DropdownItem
                key="profileImage"
                textValue="Change Profile Image"
                onClick={()=> inputUpload.current?.click()}
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
    </Navbar>}

      
    </>
  );
}
