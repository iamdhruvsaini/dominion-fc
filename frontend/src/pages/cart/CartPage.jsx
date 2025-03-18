import React, { useEffect, useState } from "react";
import SelectedPlayer from "./SelectedPlayer";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSelectedPlayer } from "@/redux/cart/cartSlice";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Trending from "./Trending";

const positionMap = {
  forwards: ["LW", "ST", "RW"], // Forwards
  midfielders: ["CDM", "CAM", "CM"], // Midfielders
  defenders: ["RB", "CB", "LB"], // Defenders
  goalkeepers: ["GK"],
};

// Requirements for each position
const positionRequirements = {
  forwards: 3,
  midfielders: 3,
  defenders: 4,
  goalkeepers: 1,
};

const CartPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(currentUser?.uid);
  const [cartSummary, setCartSummary] = useState({
    totalPlayer: 0,
    totalPrice: 0,
    positionCounts: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserSelectedPlayer(userId));
  }, [dispatch, userId]);

  const players = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (players.length >= 0) {
      //total price
      const totalPrice = players.reduce(
        (sum, player) => sum + Number(player.value_eur),
        0
      );

      const positionCounts = players.reduce((counts, player) => {
        const position = player.club_position; // Assuming 'club_position' holds the player's position

        for (const category in positionMap) {
          if (positionMap[category].includes(position)) {
            counts[category] = (counts[category] || 0) + 1;
          }
        }

        return counts;
      }, {});

      setCartSummary({
        totalPlayer: players.length,
        totalPrice,
        positionCounts,
      });
    }
  }, [players]);

  if (!players) {
    return <Loading />;
  }

  // Check if a position meets its requirement
  const isRequirementMet = (position, count) => {
    return count >= positionRequirements[position];
  };

  const handlePredictionClick = (positionsSummary) => {
    // Check if forwards requirement is met (at least 3)
    if (!positionsSummary.forwards || positionsSummary.forwards < 3) {
      toast.error("Select at least 3 forwards");
      return;
    }

    // Check if midfielders requirement is met (at least 3)
    if (!positionsSummary.midfielders || positionsSummary.midfielders < 3) {
      toast.error("Select at least 3 midfielders");
      return;
    }

    // Check if defenders requirement is met (at least 4)
    if (!positionsSummary.defenders || positionsSummary.defenders < 4) {
      toast.error("Select at least 4 defenders");
      return;
    }

    // Check if goalkeepers requirement is met (at least 1)
    if (!positionsSummary.goalkeepers || positionsSummary.goalkeepers < 1) {
      toast.error("Select at least 1 goalkeeper");
      return;
    }

    // If all requirements are met, navigate to the playing page
    navigate("/playing");
  };

  return (
    <section className="xl:max-w-[1300px] mx-auto mt-10 px-4">
      <div className="mx-auto max-w-screen-xl  2xl:px-0">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Players Cart
        </h1>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {/* selected player */}
            <SelectedPlayer players={players} />
            {/* Recommended section */}
            <Trending />
          </div>
          {/* Player summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Player summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total Players
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {cartSummary.totalPlayer}
                    </dd>
                  </dl>
                  {Object.entries(cartSummary.positionCounts).map(
                    ([category, count]) => (
                      <dl
                        className="flex items-center justify-between gap-4"
                        key={category}
                      >
                        <dt className="flex items-center gap-2 text-base font-normal text-gray-500 capitalize">
                          {category}
                          {isRequirementMet(category, count) && (
                            <svg
                              className="h-5 w-5 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </dt>
                        <dd className="flex items-center gap-1">
                          <span className="text-base font-medium text-gray-900 dark:text-white">
                            {count}
                          </span>
                          <span className="text-sm text-gray-500">
                            / {positionRequirements[category]}+
                          </span>
                        </dd>
                      </dl>
                    )
                  )}
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    $ {cartSummary.totalPrice}
                  </dd>
                </dl>
              </div>

              <button
                className={`flex w-full items-center justify-center rounded-lg p-2 font-semibold text-white ${
                  cartSummary.totalPlayer === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600"
                }`}
                disabled={cartSummary.totalPlayer === 0}
                onClick={() =>
                  handlePredictionClick(cartSummary.positionCounts)
                }
              >
                Proceed to Prediction
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
