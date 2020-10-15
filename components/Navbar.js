import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-grey-800">My Todos</p>
      <div className="flex">
        <a
          href="/api/logout"
          className="bg-blue-500 rounded text-white py-2 px-2 hover:bg-blue-600"
        >
          Logout
        </a>
        <a
          href="/api/login"
          className="bg-blue-500 rounded text-white py-2 px-2 hover:bg-blue-600"
        >
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
