"use client";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { address, isConnecting, isDisconnected } = useAccount();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto 2xl:max-w-7xl relative z-50 rounded-xl max-w-7xl">
      <div className="relative flex flex-col w-full p-5 mx-auto md:items-center md:justify-between md:flex-row md:space-x-6 lg:px-8">
        <div className="flex flex-row items-center justify-between lg:justify-start">
          <a
            className="text-lg tracking-tight text-black uppercase focus:outline-none focus:ring lg:text-2xl"
            href="/"
          >
            <img src="Logo.svg" className="h-8" alt="Logo" />
          </a>
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-black focus:outline-none focus:text-black md:hidden"
          >
            <svg
              className="w-6 h-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col items-center flex-grow md:pb-0 md:flex md:justify-end md:flex-row md:space-x-4`}
        >
          <a
            className="px-2 py-2 text-sm text-gray-500 lg:px-6 md:px-3 hover:text-gray-50"
            href="#"
          >
            Our Story
          </a>
          <a
            className="px-2 py-2 text-sm text-gray-500 lg:px-6 md:px-3 hover:text-gray-50"
            href="#"
          >
            Browse
          </a>
          <a
            className="px-2 py-2 text-sm text-gray-500 lg:px-6 md:px-3 hover:text-gray-50"
            href="#"
          >
            Contract
          </a>
          <div className="flex items-center space-x-6">
            {address && !isDisconnected ? (
              <ConnectButton />
            ) : (
              <button
                onClick={openConnectModal}
                className="  px-8 font-raleway font-medium border-2 border-secondary text-secondary hover:bg-tertiary hover:border-tertiary duration-700  transition-colors  py-2 rounded-full"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
