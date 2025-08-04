"use client";
import { Button } from "@/components/ui/buttons/Button";
import { Footer } from "@/components/ui/Footer";
import Navbar from "@/components/ui/navbars/Navbar";
import { Home } from "@/icons/Home";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-mainBgColor">
      {/* Background Animated Circles - More Subtle */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-red-300/80 blur-[80px] md:blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-0 left-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-purple-500/40 blur-[40px] md:blur-[80px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/2 left-1/2 w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-emerald-500/40 blur-[30px] md:blur-[60px] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main container */}
      <div className="relative z-10">
        <Navbar />

        {/* Main page content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mt-32 flex flex-col justify-center items-center bg-gradient-to-b">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <p className="text-3xl special md:text-6xl text-center font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight antialiased">
                Page Not Found
              </p>

              <motion.p
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5 }}
                className="text-center mt-7 text-xl md:text-4xl font-semibold bg-gradient-to-r text-black bg-clip-text leading-snug antialiased"
              >
                404: Oops! We couldn&apos;t find that page. Let&apos;s get you
                back on track.
              </motion.p>
            </motion.div>

            <div className="mt-10">
              <Link href={"/"}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => console.log("hover started!")}
                >
                  <Button
                    colorVariant="blue"
                    sizeVariant="medium"
                    text="Go to Home"
                    className="text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-blue-500 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-600/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    endIcon={<Home className="size-6 " />}
                  />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}
