import React, { useState } from "react";
import { BasketRadialChart } from "./BasketRadialChart";
import { Link } from "react-router-dom";
import { Shield, Users, Gauge, Footprints, Crosshair } from "lucide-react";

const BasketCard = ({ option }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Position-specific icons and colors
  const getPositionIcon = (position) => {
    switch (position) {
      case "Forwards":
        return <Gauge strokeWidth={1.5} />;
      case "Defenders":
        return <Shield strokeWidth={1.5} />;
      case "Goalkeepers":
        return <Crosshair strokeWidth={1.5} />;
      case "Wingers":
        return <Footprints strokeWidth={1.5} />;
      case "Midfielders":
        return <Users strokeWidth={1.5} />;
      default:
        return <Users strokeWidth={1.5} />;
    }
  };

  const getPositionColors = (position) => {
    switch (position) {
      case "Forwards":
        return {
          primary: "text-blue-600",
          secondary: "text-cyan-400",
          shadow: "shadow-blue-200",
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-500"
        };
      case "Defenders":
        return {
          primary: "text-green-600",
          secondary: "text-emerald-400",
          shadow: "shadow-green-200",
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "text-green-500"
        };
      case "Goalkeepers":
        return {
          primary: "text-purple-600",
          secondary: "text-violet-400",
          shadow: "shadow-purple-200",
          bg: "bg-purple-50",
          border: "border-purple-200",
          icon: "text-purple-500"
        };
      case "Wingers":
        return {
          primary: "text-orange-600",
          secondary: "text-amber-400",
          shadow: "shadow-orange-200",
          bg: "bg-orange-50",
          border: "border-orange-200",
          icon: "text-orange-500"
        };
      case "Midfielders":
        return {
          primary: "text-pink-600",
          secondary: "text-rose-400",
          shadow: "shadow-pink-200",
          bg: "bg-pink-50",
          border: "border-pink-200",
          icon: "text-pink-500"
        };
      default:
        return {
          primary: "text-blue-600",
          secondary: "text-cyan-400",
          shadow: "shadow-blue-200",
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-500"
        };
    }
  };

  const colors = getPositionColors(option.position_bucket);

  return (
    <div 
      className={`relative rounded-xl ${colors.bg} border ${colors.border} ${colors.shadow} shadow-lg 
      transition-all duration-500 ${isHovered ? 'shadow-xl translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated corner accents */}
      <div className={`absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg ${colors.primary} opacity-0 
        ${isHovered ? 'animate-fadeIn opacity-100' : ''} transition-opacity duration-300`}></div>
      <div className={`absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg ${colors.primary} opacity-0 
        ${isHovered ? 'animate-fadeIn opacity-100' : ''} transition-opacity duration-300`}></div>
      <div className={`absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg ${colors.primary} opacity-0 
        ${isHovered ? 'animate-fadeIn opacity-100' : ''} transition-opacity duration-300`}></div>
      <div className={`absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 rounded-br-lg ${colors.primary} opacity-0 
        ${isHovered ? 'animate-fadeIn opacity-100' : ''} transition-opacity duration-300`}></div>
        
      <div className="p-5 rounded-xl h-full flex flex-col">
        <div className="relative mb-6">
          <BasketRadialChart option={option} />
          
          {/* Icon positioned in a circle above the chart */}
          <div className={`absolute -top-2 right-0 p-2 rounded-full ${colors.bg} ${colors.border} border 
            transform transition-all duration-500 ${isHovered ? 'rotate-12 scale-110' : ''}`}>
            <div className={`w-8 h-8 ${colors.icon}`}>
              {getPositionIcon(option.position_bucket)}
            </div>
          </div>
        </div>
        
        <Link to={option.link} className="mt-auto">
          <div className="flex items-center justify-center gap-2 mb-3 group">
            <h3 className={`text-xl font-extrabold text-center ${colors.primary} 
              transform transition-all duration-300 group-hover:scale-105`}>
              {option.position_bucket}
              <div className={`h-0.5 w-0 mx-auto ${colors.secondary} transition-all duration-500 
                group-hover:w-full`}></div>
            </h3>
          </div>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 text-center text-sm font-medium leading-snug">
          {option.description}
        </p>
        
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-center items-center">
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.primary} bg-opacity-10 
              px-3 py-1 rounded-full ${colors.bg} ${isHovered ? 'animate-pulse' : ''}`}>
              {option.players} Players
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Keyframe animation for fading in
const fadeInAnimation = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out forwards;
}
`;

// Inject the animation styles
const style = document.createElement('style');
style.textContent = fadeInAnimation;
document.head.appendChild(style);

export default BasketCard;