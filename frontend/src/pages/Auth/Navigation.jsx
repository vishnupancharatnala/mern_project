import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa"; // Employee list icon
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0f0f0f] z-50 border-b px-8 py-4">
      <section className="flex justify-between items-center">
        {/* Section 1: Navigation Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="flex items-center text-white transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome size={26} />
            <span className="ml-2">Home</span>
          </Link>

          <Link
            to="/admin/employees-list"
            className="flex items-center text-white transition-transform transform hover:translate-x-2"
          >
            <FaUserFriends size={26} />
            <span className="ml-2">Employees</span>
          </Link>
        </div>

        {/* Section 2: User Account / Logout */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            {userInfo ? (
              <span>{userInfo.username}</span>
            ) : (
              <></>
            )}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul className="absolute right-0 mt-2 w-[10rem] bg-white text-gray-600">
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/employees/create"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      create Employee
                    </Link>
                  </li>
                </>
              )}

              {/* <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li> */}

              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center text-white transition-transform transform hover:translate-x-2"
                >
                  <AiOutlineLogin size={26} />
                  <span className="ml-2">Login</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center text-white transition-transform transform hover:translate-x-2 ml-4"
                >
                  <AiOutlineUserAdd size={26} />
                  <span className="ml-2">Register</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
