import { Link } from "react-router-dom";
// import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImg from "../../assets/images/logo.svg";
import { useState } from "react";
import Modal from "../ui/Modal";
import CartModal from "../cart/cartModal";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false); // Profile dropdown state
  const [isOpenCart, setIsOpenCart] = useState(false); // Profile dropdown state

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
      <nav className="flex justify-between items-center px-10 bg-gradient-to-b from-sky-400 to-sky-200">
        {/* My Logo */}
        <div className="flex items-center justify-between gap-2">
          <Link to="/">
            <img src={LogoImg} alt="" className="object-fill h-10" />
          </Link>

          <div>
            <p className="text-2xl text-white font-medium">Fitmate</p>
            <p className="text-sm text-white font-light">
              <i>all for one</i>
            </p>
          </div>
        </div>
        {/* Search */}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 text-white">
          <Link
            to="/progress"
            className="px-4 py-2 hover:text-yellow-800 font-bold"
          >
            Your Progress
          </Link>
          <Link
            to="/products"
            className="px-4 py-2 hover:text-yellow-800 font-bold"
          >
            Products
          </Link>
          <Link
            to="/exercises"
            className="px-4 py-2 hover:text-yellow-800 font-bold"
          >
            Exercises
          </Link>
          <Link
            to="/meals"
            className="px-4 py-2 hover:text-yellow-800 font-bold"
          >
            Meals
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 hover:text-yellow-800 font-bold"
          >
            About us
          </Link>
          <Link
            to="/promotions"
            className="px-4 py-2 hover:text-yellow-800 font-bold"
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
              className="flex flex-row items-center justify-between space-x-2 px-2 me-4 text-white transition duration-200 hover:text-orange-500 hover:ease-in-out focus:text-sky-700"
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} size="2x" />
            </button>

            {/* Cart Modal */}
            <Modal isOpen={isOpenCart} onClose={closeCartModal}>
              <CartModal onClose={closeCartModal} />
            </Modal>
          </div>

          {/* Notification */}
          <a
            className="relative me-4 text-white transition duration-200 hover:text-orange-500 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none"
            href="#"
          >
            <FontAwesomeIcon icon={["far", "bell"]} size="2x" />
            <div className="bg-sky-400 absolute -right-0.5 -top-1 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
              10
            </div>
          </a>
          {/* Profile */}
          {/* Sign Up and Sign In */}
          {!isLogin ? (
            <div className="flex items-center space-x-0 border-1 border-sky-200 rounded-2xl">
              <Link
                to="/login"
                className="p-2 text-sky-950 bg-white font-bold hover:bg-sky-300 hover:text-white rounded-l-2xl"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="p-2 border-l-1 bg-sky-800 text-white hover:text-sky-800 font-bold rounded-r-2xl"
              >
                Sign up
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
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    Account settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
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
