import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "react-router-dom";
import {
  AlignRight,
  ChartBarBig,
  LayoutDashboard,
  ShoppingBasket,
  SwatchBookIcon,
} from "lucide-react";

const DropDownItems = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignRight />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <Link to="/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboard className="h-50 w-50" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/stat">
          <DropdownMenuItem className="cursor-pointer">
            <ChartBarBig className="h-50 w-50" />
            Stats
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/bucket">
          <DropdownMenuItem className="cursor-pointer">
            <SwatchBookIcon className="h-50 w-50" />
            Bucket
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/cart">
          <DropdownMenuItem className="cursor-pointer">
            <ShoppingBasket className="h-50 w-50" />
            cart
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownItems;
