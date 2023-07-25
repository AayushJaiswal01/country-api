import React from "react";
import Toggle from "./Toggle";

function Header() {
  return (
    <header
      className="flex justify-between items-center fixed w-full bg-white 
  shadow p-4 dark:bg-lightdark "
    >
      <div>
        <h1 className="font-bold text-gray-900 dark:text-white text-4xl">
          Where in the world ?
        </h1>
      </div>
      <Toggle />
    </header>
  );
}

export default Header;
