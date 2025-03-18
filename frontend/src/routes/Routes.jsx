import AdminDashboardHome from "@/admin/admin-dashboard/AdminDashboardHome";
import AdminHome from "@/admin/AdminHome";
import AdminLogin from "@/admin/AdminLogin";
import DashboardLayout from "@/admin/DashboardLayout";
import App from "@/App";
import LoginPage from "@/components/LoginPage";
import PageNotFound from "@/components/PageNotFound";
import SignUpPage from "@/components/SignUpPage";
import StatsTable from "@/components/StatsTable";
import BasketMain from "@/pages/basket/BasketMain";
import Defenders from "@/pages/basket/defenders/Defenders";
import Forwards from "@/pages/basket/forwards/Forwards";
import Goalkeepers from "@/pages/basket/goalkeepers/Goalkeepers";
import Midfielders from "@/pages/basket/midfielders/Midfielders";
import CartPage from "@/pages/cart/CartPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/home/Home";
import PlayerComparison from "@/pages/player-comparison/PlayerComparison";
import PlayerCard from "@/pages/players-card/PlayerCard";
import StatLink from "@/pages/stats/StatLink";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import TrendingPlayers from "@/admin/admin-dashboard/TrendingPlayers";
import UsersPage from "@/admin/admin-dashboard/users/UsersPage";
import Employees from "@/admin/admin-dashboard/users/Employees";
import RemovePlayers from "@/admin/admin-dashboard/remove-players/RemovePlayers";
import MarkSold from "@/admin/admin-dashboard/mark-sold/MarkSold";
import AllPlayers from "@/pages/players/AllPlayers";
import AdminRoute from "./AdminRoute";
import SuperAdminRoute from "./SuperAdminRoute";
import Playing from "@/pages/football-field/Playing";
import AddPlayer from "@/admin/admin-dashboard/add-player/AddPlayer";
import Contact from "@/pages/contact/Contact";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <SignUpPage />,
      },
      {
        path: "card/:playerId",
        element: <PlayerCard />,
      },
      {
        path: "players",
        element: (
          <PrivateRoute>
            <AllPlayers />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "bucket",
        element: (
          <PrivateRoute>
            <BasketMain />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "stat",
        element: (
          <PrivateRoute>
            <StatLink />
          </PrivateRoute>
        ),
      },
      {
        path: "table/:link",
        element: (
          <PrivateRoute>
            <StatsTable />
          </PrivateRoute>
        ),
      },
      {
        path: "forwards",
        element: (
          <PrivateRoute>
            <Forwards />
          </PrivateRoute>
        ),
      },
      {
        path: "defenders",
        element: (
          <PrivateRoute>
            <Defenders />
          </PrivateRoute>
        ),
      },
      {
        path: "goalkeepers",
        element: (
          <PrivateRoute>
            <Goalkeepers />
          </PrivateRoute>
        ),
      },
      {
        path: "midfielders",
        element: (
          <PrivateRoute>
            <Midfielders />
          </PrivateRoute>
        ),
      },
      
      {
        path: "player-comparison",
        element:<PrivateRoute><PlayerComparison /></PrivateRoute> ,
      },
      {
        path:"playing",
        element:<PrivateRoute><Playing/></PrivateRoute>,
      },
      {
        path:"contact",
        element:<Contact/>
      }
    ],
  },

  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        path: "portal",
        element: (
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <AdminRoute>
                <AdminDashboardHome />
              </AdminRoute>
            ),
          },
          {
            path: "trending-players",
            element: (
              <AdminRoute>
                <TrendingPlayers />
              </AdminRoute>
            ),
          },
          {
            path: "users",
            element: (
              <SuperAdminRoute>
                <UsersPage />
              </SuperAdminRoute>
            ),
          },
          {
            path: "employees-details",
            element: (
              <AdminRoute>
                <Employees />
              </AdminRoute>
            ),
          },
          {
            path: "remove-players",
            element: (
              <AdminRoute>
                <RemovePlayers />
              </AdminRoute>
            ),
          },
          {
            path: "mark-sold",
            element: (
              <AdminRoute>
                <MarkSold />
              </AdminRoute>
            ),
          },
          {
            path: "add-player",
            element: (
              <AdminRoute>
                <AddPlayer />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
