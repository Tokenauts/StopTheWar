import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./loading";
import { motion } from "framer-motion";
import LottieHorizontal from "./LottieHorizontal";
import LottieVertical from "./LottieVertical";
const videoVariants = {
  hidden: { y: "-20%" },
  visible: { y: "0%" },
};

const buttonVariants = {
  hidden: { y: "20%" },
  visible: { y: "0%" },
};

const Homepage = () => {
  return (
    <div>
      <section>
        <div class="items-center px-8 py-12 mx-auto max-w-7xl lg:px-16 md:px-12 lg:py-24 h-full">
          <div class="justify-center w-full text-center lg:p-10 max-auto">
            <div class="justify-center w-full mx-auto">
              <div className="relative inline-block">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={videoVariants}
                  transition={{ duration: 0.75 }}
                  className="mx-auto pointer-events-none   block md:block lg:hidden xl:hidden"
                >
                  <LottieVertical />
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={videoVariants}
                  transition={{ duration: 0.75 }}
                  className="mx-auto pointer-events-none hidden md:hidden lg:block xl:block"
                >
                  <LottieHorizontal />
                </motion.div>
              </div>

              {/* <p class="max-w-xl mx-12 mt-4 text-lg tracking-tight text-gray-600 text-left left-0">
                If you could kick the person in the pants responsible for most
                of your trouble, you wouldn't sit for a month
              </p> */}
            </div>
            <div class=" left-0 mx-auto max-w-xl mt-10 ">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                transition={{ duration: 0.75 }}
              >
                <Link to="/donate">
                  <button className=" w-46 px-8 font-raleway font-medium border-2 border-secondary text-secondary hover:bg-tertiary hover:border-tertiary duration-700  transition-colors  py-2 rounded-full">
                    I want to Help
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>

          <div class="flex justify-center gap-6 mt-6">
            <a class="p-1 -m-1 group" aria-label="Follow on Twitter" href="#">
              <ion-icon
                class="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-twitter"
                role="img"
                aria-label="logo twitter"
              ></ion-icon>
            </a>
            <a class="p-1 -m-1 group" aria-label="Follow on Instagram" href="#">
              <ion-icon
                class="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-instagram"
                role="img"
                aria-label="logo instagram"
              ></ion-icon>
            </a>
            <a class="p-1 -m-1 group" aria-label="Follow on GitHub" href="#">
              <ion-icon
                class="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-github"
                role="img"
                aria-label="logo github"
              ></ion-icon>
            </a>
            <a class="p-1 -m-1 group" aria-label="Follow on LinkedIn" href="#">
              <ion-icon
                class="w-6 h-6 transition fill-black hover:text-blue-500 md hydrated"
                name="logo-linkedin"
                role="img"
                aria-label="logo linkedin"
              ></ion-icon>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
