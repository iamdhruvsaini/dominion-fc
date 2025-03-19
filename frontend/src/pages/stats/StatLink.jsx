import FootballAd from "@/components/FootballAd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ChevronRight, Award, TrendingUp, DollarSign, Users, Shield, Shirt, Gauge, Zap, Star } from "lucide-react";

// Organized categories with icons
const categoryGroups = [
  {
    title: "Overall Stats",
    icon: <Award className="w-5 h-5" />,
    categories: [
      "Top-Rated Players",
      "High Potential Players",
      "Biggest Rating Differences",
    ]
  },
  {
    title: "Financial",
    icon: <DollarSign className="w-5 h-5" />,
    categories: [
      "Most Valuable Players",
      "Highest-Paid Players",
      "Best Value for Money",
    ]
  },
  {
    title: "Position-Based",
    icon: <Shirt className="w-5 h-5" />,
    categories: [
      "Best Forwards",
      "Best Midfielders",
      "Best Defenders",
      "Best Goalkeepers",
    ]
  },
  {
    title: "Skill-Based",
    icon: <Gauge className="w-5 h-5" />,
    categories: [
      "Best Dribblers",
      "Best Passers",
      "Fastest Players",
      "Most Physical Players",
    ]
  },
  {
    title: "Specialized",
    icon: <Star className="w-5 h-5" />,
    categories: [
      "Players with Highest Skill Moves",
      "Best Players by Attacking Attributes",
      "Best Players by Defensive Attributes",
      "Best All Round Players",
      "Players with Best Fitness Level"
    ]
  }
];

const StatLink = () => {
  const [activeTab, setActiveTab] = useState("categories"); // Changed default to categories
  const [expandedGroups, setExpandedGroups] = useState(categoryGroups.map(group => group.title)); // All groups expanded by default

  const toggleGroup = (title) => {
    setExpandedGroups(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <section className="py-8 p-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-screen-xl 2xl:px-0">
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('main')}
                className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === 'main'
                    ? 'text-blue-600 border-blue-600 active'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Main Rankings
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab('categories')}
                className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === 'categories'
                    ? 'text-blue-600 border-blue-600 active'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Categories
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        {activeTab === 'main' ? (
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <Award className="w-6 h-6 mr-2 text-blue-600" />
                Player Rankings & Comparisons
              </h2>
              <p className="text-gray-600 mb-4">
                Explore football player stats across positions, leagues, and attributes.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                <button
                  onClick={() => setActiveTab('categories')}
                  className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 transition-all rounded-lg border border-blue-100"
                >
                  <span className="font-medium">Browse All Categories</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-all rounded-lg border border-gray-100">
                  <span className="font-medium">Popular Rankings</span>
                  <Zap className="w-5 h-5" />
                </button>

                <button className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-all rounded-lg border border-gray-100">
                  <span className="font-medium">Custom Comparison</span>
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Football Stats Categories</h2>

            <div className="grid gap-6">
              {categoryGroups.map((group) => (
                <div key={group.title} className="border border-gray-100 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center">
                      <span className="bg-white p-2 rounded-full mr-3 text-blue-600 shadow-sm">
                        {group.icon}
                      </span>
                      <span className="font-semibold">{group.title}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedGroups.includes(group.title) ? 'rotate-90' : ''}`} />
                  </button>

                  {expandedGroups.includes(group.title) && (
                    <div className="p-4 bg-white">
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {group.categories.map((category) => (
                          <li key={category}>
                            <Link
                              to={`/table/${category.toLowerCase().replace(/\s+/g, '-')}`}
                              className="flex items-center p-3 hover:bg-blue-50 rounded-md transition-all"
                            >
                              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                              {category}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={() => setActiveTab('main')}
                className="flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all w-full md:w-auto px-6"
              >
                Back to Main Rankings
              </button>
            </div>
          </div>
        )}
      </div>

      <FootballAd />
    </section>
  );
};

export default StatLink;