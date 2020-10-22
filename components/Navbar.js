import React from "react";

const Navbar = ({ user }) => {
  return (
    <nav>
      <div className="flex items-center justify-between py-4  ">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800 md:text-3xl">
            <a href="#">My Todos</a>
          </div>
        </div>
        <div className="flex">
          {user ? (
            <a
              href="/api/logout"
              className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
            >
              Logout
            </a>
          ) : (
            <a
              href="/api/login"
              className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
