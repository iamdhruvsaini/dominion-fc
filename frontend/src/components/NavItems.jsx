import React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";
import { ChartBarBig, LayoutDashboard, ShoppingBasket, SwatchBookIcon } from "lucide-react";

const NavItems = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <Link to={"/dashboard"}>
          <MenubarTrigger><LayoutDashboard className="pr-2" />Dashboard</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={"/stat"}>
          <MenubarTrigger><ChartBarBig className="pr-2" />Stats</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={"/bucket"}>
          <MenubarTrigger><SwatchBookIcon className="pr-2" />Bucket</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={"/cart"}>
          <MenubarTrigger><ShoppingBasket className="pr-2" />Cart</MenubarTrigger>
        </Link>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavItems;
