import { Link } from "react-router-dom";
// import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImg from "../../assets/images/logo-dark.png";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import CartModal from "../cart/CartModal";
import useUserStore from "../../stores/useUserStore";

function Header() {
  const { user, isAuthenticated, logout } = useUserStore();

  const [isOpenProfile, setIsOpenProfile] = useState(false); // Profile dropdown state
  const [isOpenCart, setIsOpenCart] = useState(false); // Profile dropdown state
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return;
    const result = await logoutUser(refreshToken);

    if (result.success) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login";
    } else {
      alert("Logout failed: " + result.errors?.Exception || "Unknown error");
    }
  }
  const openCartModal = () => {
    setIsOpenCart(true);
  };

  const closeCartModal = () => {
    setIsOpenCart(false);
  };

  function toggleDropdownProfile() {
    setIsOpenProfile(!isOpenProfile);
  }
  return (
    <header className="sticky top-0 z-50">
      <nav className="flex justify-between items-center px-10 h-20" style={{
        background: "linear-gradient(to top, #0D5EA6, #61A3D3)"
      }}>
        {/* My Logo */}
        <div className="flex items-center justify-between gap-2">
          <Link to="/">
            <img src={LogoImg} alt="" className="object-fill h-8" />
          </Link>
        </div>
        {/* Search */}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 text-white">
          <Link
            to="/progress"
            className="px-4 py-2 hover:text-[#1F2937] font-bold"
          >
            Your Progress
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 hover:text-[#1F2937] font-bold"
          >
            Products
          </Link>
          <Link
            to="/exercises"
            className="px-4 py-2 hover:text-[#1F2937] font-bold"
          >
            Exercises
          </Link>
          <Link
            to="/meals"
            className="px-4 py-2 hover:text-[#1F2937] font-bold"
          >
            Meals
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 hover:text-[#1F2937] font-bold"
          >
            About us
          </Link>
          <Link
            to="/promotions"
            className="px-4 py-2 hover:text-[#1F2937] font-bold"
          >
            Promotions
          </Link>
        </div>

        {/*Cart + Notification + Profile */}
        <div className="flex flex-row items-center">
          {/* Cart */}
          <div className="relative inline-block">
            <button
              onClick={openCartModal}
              className="flex flex-row items-center justify-between space-x-2 px-2 me-4 text-white transition duration-200 hover:text-[#1F2937] hover:ease-in-out focus:text-sky-700"
            >
              <div className="relative">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} style={{ fontSize: '20px' }} />
                <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                  {totalItems}
                </div>
              </div>
            </button>

            {/* Cart Modal */}
            <Modal isOpen={isOpenCart} onClose={closeCartModal}>
              <CartModal onClose={closeCartModal} />
            </Modal>
          </div>

          {/* Notification */}
          <a
            className="relative inline-block me-4 text-white transition duration-200 hover:text-[#1F2937] focus:text-neutral-700"
            href="#"
          >
            <FontAwesomeIcon icon={["far", "bell"]} style={{ fontSize: "22px" }} />
            <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              10
            </div>
          </a>
          {/* Profile */}
          {/* Sign Up and Sign In */}

          {!isAuthenticated ? (
            <div className="flex items-center my-2 overflow-hidden border border-white/30 rounded-2xl backdrop-blur-sm bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link
                to="/login"
                className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 hover:text-white transition-all duration-300 rounded-l-2xl border-r border-white/20"

              >
                <FontAwesomeIcon
                  icon={["fas", "sign-in-alt"]}
                  className="mr-2"
                />
                Sign In
              </Link>
              <span className="text-white">|</span>
              <Link
                to="/register"
                className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-r-2xl"
              >
                <FontAwesomeIcon icon={["fas", "user-plus"]} className="mr-2" />

                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative p-2">
              {/* Profile Button */}
              <button
                onClick={toggleDropdownProfile}
                className="flex items-center space-x-3 px-3 py-2 rounded-full bg-white/40 hover:bg-white/20 transition duration-200 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/50 hover:border-white transition duration-200">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      user?.profileImage ||
                      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                    }
                    alt="Profile"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-white font-medium text-sm">
                    {user?.firstName || user?.username}
                  </span>
                  <span className="text-white/70 text-xs">
                    {user?.role || "Member"}
                  </span>
                </div>
                <FontAwesomeIcon
                  icon={["fas", "chevron-down"]}
                  className={`text-white text-xs transition-transform duration-200 ${
                    isOpenProfile ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpenProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                  <a
                    href="/user/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"

                  >
                    Account settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-[#1F2937] hover:text-white"
                  >
                    Support
                  </a>
                  <a
                    onClick={logout}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-[#1F2937] hover:text-white rounded-b-lg"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
