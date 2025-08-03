import { motion } from "framer-motion";

export const ThanksForVisit = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center p-4"
    >
      <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Thanks for visiting PrepNerdz! 🚀
      </p>
      <p className="text-sm text-gray-600 mt-1">
        We hope you found what you were looking for.
      </p>
    </motion.div>
  );
};