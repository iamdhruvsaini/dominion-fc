import getBaseURL from "@/utils/baseURL";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaFacebook, FaTwitter, FaDiscord, FaDribbble } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Footer = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleSubscribe = async (formData) => {
    try {
      if (!formData.email) {
        Swal.fire({
          title: "Error!",
          text: "Please enter a valid email address.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        return;
      }

      const response = await axios.post(`${getBaseURL()}/api/users/subscribe`, {
        email: formData.email,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Subscribed!",
          text: "You have successfully subscribed to our newsletter.",
          icon: "success",
          confirmButtonColor: "#4CAF50",
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          Swal.fire({
            title: "Warning!",
            text: error.response.data.message,
            icon: "warning",
            confirmButtonColor: "#d33",
          });
        } else if (error.response.status === 404) {
          Swal.fire({
            title: "User Not Found!",
            text: "Please register first!",
            icon: "warning",
            confirmButtonColor: "#FFC107",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Network error. Please check your connection.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <footer className="bg-slate-50 pt-10 pb-2 mt-10">
      <div className="xl:w-[1300px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-950">Dominion FC.</span>
            </Link>
            <p className="mt-4 text-gray-700">
              Your ultimate destination for football news, updates, and exclusive content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-800 hover:text-blue-800 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-800 hover:text-blue-800 transition duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-800 hover:text-blue-800 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-800 hover:text-blue-800 transition duration-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition duration-300"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition duration-300"
              >
                <FaDiscord size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition duration-300"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition duration-300"
              >
                <FaDribbble size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col gap-4">
            <div>
              <Link to="/admin" className=" hover:text-gray-500 transition duration-300">
                <h3 className="text-lg rounded-lg font-extrabold text-blue-950">
                  Login as Admin
                </h3>
              </Link>
            </div>
            <div>
              <h3 className="text-md font-semibold mb-4 text-gray-600">Subscribe to Our Newsletter</h3>
              <form onSubmit={handleSubmit(handleSubscribe)} className="flex flex-col space-y-4">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  autoComplete="off"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100  placeholder-gray-500 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Dominion FC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;