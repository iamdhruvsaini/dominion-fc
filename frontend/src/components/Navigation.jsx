import React from "react";
import NavItems from "./NavItems";
import { FaUser } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, Volleyball } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropDownItems from "./DropDownItems";

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const photoURL = currentUser?.photo;

  const handleProfileClick = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="sticky z-30 top-0 bg-white w-full shadow-lg">
      <nav className="xl:max-w-[1300px] h-full mx-auto px-4 py-2 flex items-center justify-between">
        <Link className="text-xl font-semibold" to={"/"} replace={true}>
          Dominion Fc.
        </Link>
        <div className="hidden lg:block ml-24">
          <NavItems></NavItems>
        </div>

        <div className="flex gap-4 items-center">
          <button
            className="hidden text-sm lg:flex gap-2 justify-between items-center border-gray-300 px-3 py-2 border rounded-xl w-fit hover:border-gray-700 duration-300"
            onClick={() => navigate("/players")}
          >
            <Volleyball size={20} />
            <span className="font-medium">Look Out Players</span>
          </button>
          {currentUser ? (
            <>
              {/* Profile Link  */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage src={photoURL} alt="User Avatar" />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 bg-gray-50">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOutIcon className="h-50 w-50" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropDownItems />
            </>
          ) : (
            <FaUser
              className="cursor-pointer"
              onClick={handleProfileClick}
            ></FaUser>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
