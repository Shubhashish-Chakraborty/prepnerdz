  "use client";
  import { Button } from "@/components/ui/buttons/Button";
  import Navbar from "@/components/ui/navbars/Navbar";
  import { Home } from "@/icons/Home";
  import { motion } from "framer-motion";
  import Link from "next/link";

  export default function NotFound() {
    return (
      <>
        <Navbar />
        <div className="mt-32 flex flex-col justify-center items-center bg-gradient-to-b from-yellow-100 via-pink-100 to-rose-100">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <p className="text-6xl text-center font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight antialiased">
              Page Not Found
            </p>

            <motion.p
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5 }}
              className="text-center mt-7 text-4xl font-semibold bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent leading-snug antialiased"
            >
              404: Just like your crush, this page doesn’t even know you exist.
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
                  text="Don't Cry - Go to Home"
                  className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  endIcon={<Home className="size-6 " />}
                />
              </motion.div>
            </Link>
          </div>
        </div>
      </>
    );
  }
