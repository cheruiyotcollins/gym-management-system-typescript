import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import logo from "../common/logo.png"; // Add your logo image path here
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartItemCount = useSelector(
    (state: RootState) => state?.cart?.singleCart?.cartItemDtoList?.length || 0
  );

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative z-40 flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <Menu.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </Menu.Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="block lg:hidden h-8 w-auto"
              src={logo} // Using the imported logo image
              alt="GymApp"
            />
            <img
              className="hidden lg:block h-8 w-auto"
              src={logo} // Using the imported logo image
              alt="GymApp"
            />
          </div>

          {/* Links and User Actions */}
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0"></div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className={classNames(
                        "text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      Profile
                    </Link>
                    {/* Cart Button */}
                    <Link to="/cart" className="relative">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
                      >
                        <ShoppingCartIcon className="h-6 w-6" />
                      </button>
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                    {/* Notifications */}
                    <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className={classNames(
                        "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className={classNames(
                        "bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <Menu as="div" className="space-y-1 px-2 pt-2 pb-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={classNames(
                    "text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  Profile
                </Link>
                <Link
                  to="/cart"
                  className={classNames(
                    "text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  Cart
                </Link>
                <button
                  type="button"
                  className={classNames(
                    "text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={classNames(
                    "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={classNames(
                    "bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </Menu>
        </div>
      </div>
    </nav>
  );
}
