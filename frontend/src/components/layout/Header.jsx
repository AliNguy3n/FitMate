import { Link } from "react-router-dom";
// import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImg from "../../assets/images/logo-dark.png";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import CartModal from "../cart/cartModal";
import { logoutUser } from "../../services/authService";
import useCartStore from "../../stores/useCartStore";

function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLogin(!!token);
  }, []);
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
          {!isLogin ? (
            <div className="flex items-center text-white space-x-4">
              <Link
                to="/login"
                className="hover:text-[#1F2937] transition font-semibold"
              >
                Sign In
              </Link>
              <span className="text-white">|</span>
              <Link
                to="/register"
                className="hover:text-[#1F2937] transition font-semibold"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="relative">
              {/* was Login */}
              <button
                onClick={toggleDropdownProfile}
                className="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
              >
                <img
                  className="h-8 object-cover"
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                  alt="Your avatar"
                />
              </button>
              {isOpenProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-[#1F2937] hover:text-white rounded-t-lg"
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
