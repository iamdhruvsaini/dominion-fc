import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
    navigate("/admin", { replace: true });
  };

  // Function to close the menu when a link is clicked
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Define navigation items to ensure consistency between desktop and mobile
  const navItems = [
    {
      to: "/admin/portal",
      icon: <Home className="h-4 w-4 md:h-5 md:w-5" />,
      label: "Home",
    },
    {
      to: "/admin/portal/users",
      icon: <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />,
      label: "Users",
    },
    {
      to: "/admin/portal/remove-players",
      icon: <Package className="h-4 w-4 md:h-5 md:w-5" />,
      label: "Remove Player",
    },
    {
      to: "/admin/portal/mark-sold",
      icon: <Users className="h-4 w-4 md:h-5 md:w-5" />,
      label: "Mark Sold",
    },
    {
      to: "/admin/dhruv",
      icon: <LineChart className="h-4 w-4 md:h-5 md:w-5" />,
      label: "Analytics",
    },
    {
      to: "/admin/portal/add-player",
      icon: <UserPlus className="h-4 w-4 md:h-5 md:w-5" />,
      label: "Add Player",
    },
  ];

  return (
    <section className="min-h-screen bg-muted/4 w-full">
      <div className="grid max-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden border-r md:block">
          <div className="flex max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                to="/admin/portal"
                className="flex items-center gap-2 font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="truncate">Dominion Fc.</span>
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card>
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle className="text-sm lg:text-base">
                    Upgrade to Pro
                  </CardTitle>
                  <CardDescription className="text-xs lg:text-sm">
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full min-w-0 overflow-hidden">
          <header className="flex h-14 items-center gap-2 sm:gap-4 border-b bg-muted/40 px-2 sm:px-4 lg:h-[60px] lg:px-6">
            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col w-[250px] max-w-[80vw]"
              >
                {/* Added SheetTitle for accessibility */}
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="grid gap-2 text-base font-medium">
                  <Link
                    to="/admin/portal"
                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                    onClick={handleNavLinkClick}
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="font-semibold truncate">Dominion Fc.</span>
                  </Link>

                  {navItems.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        `flex items-center gap-4 rounded-lg px-3 py-2 hover:text-foreground ${
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-transparent"
                        }`
                      }
                    >
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto pt-4">
                  <Card>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm">Upgrade to Pro</CardTitle>
                      <CardDescription className="text-xs">
                        Unlock all features and get unlimited access to our
                        support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handleNavLinkClick}
                      >
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>

            {/* Header Content */}
            <div className="w-full flex-1 min-w-0">
              <div className="relative">
                <h1 className="text-sm sm:text-md lg:text-lg font-semibold text-gray-700 truncate">
                  Welcome Back 
                </h1>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="hover:bg-gray-700 hover:text-white duration-300 px-2 sm:px-4"
            >
              <CircleUser className="h-5 w-5 mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </header>

          {/* Main Content - With improved overflow handling */}
          <main className="flex flex-1 flex-col gap-4 p-2 sm:p-4 overflow-auto min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
