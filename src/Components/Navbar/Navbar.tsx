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
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserDataShared } from "../Context/UserContext/UserDataProvider";

export default function AppNavbar() {
  
  const userData = useContext(UserDataShared);
  const router = useNavigate();
  
    if (!userData) {
      throw new Error("hamsa sahdasdh");
    }
  
    const {token, setToken} = userData;

    function handleLogout() {
      localStorage.clear();
      setToken(localStorage.getItem('token'));
      router('/login');
    }

  return (
    <Navbar maxWidth="xl" className="bg-indigo-400 px-4 sm:px-6 lg:px-8">
      <NavbarBrand className="cursor-pointer">
        <HuobiToken size="35" color="#FFF" />
        <p className="font-bold  text-white">HA Home</p>
      </NavbarBrand>

      {token && (
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link className="text-white" color="foreground" to="/">
              Tasks
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link className="text-white" aria-current="page" color="secondary" to="/expenses">
              Expenses
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      {token && <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform cursor-pointer"
              color="default"
              name=""
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem textValue="Signed in as" key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            {/* <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>}
    </Navbar>
  );
}
