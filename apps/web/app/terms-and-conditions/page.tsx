"use client";
import { motion } from "framer-motion";
import { tncContent } from "./tnc-content";
import { Footer } from "@/components/ui/Footer";
import Navbar from "@/components/ui/navbars/Navbar";
import Head from "next/head";

const TermsAndConditionsPage = () => {
  return (
    <div className="relative min-h-screen bg-mainBgColor">
      <Head>
        <title>
          Terms & Conditions | PrepNerdz - Student Learning Platform
        </title>
        <meta
          name="description"
          content="Review PrepNerdz's Terms & Conditions. Understand the rules and guidelines for using our educational platform and services."
        />
        <meta
          name="keywords"
          content="PrepNerdz terms, student platform rules, education service terms, learning app conditions, RGPV student guidelines"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://prepnerdz.tech/terms-and-conditions"
        />
        <meta property="og:title" content="Terms & Conditions | PrepNerdz" />
        <meta
          property="og:description"
          content="Official terms of service for using PrepNerdz educational platform"
        />
        <meta
          property="og:image"
          content="https://prepnerdz.tech/prepnerdz-only-specs.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://prepnerdz.tech/terms-and-conditions"
        />
        <meta name="twitter:title" content="Terms & Conditions | PrepNerdz" />
        <meta
          name="twitter:description"
          content="Learn the terms governing your use of PrepNerdz platform"
        />
        <meta
          name="twitter:image"
          content="https://prepnerdz.tech/prepnerdz-only-specs.png"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://prepnerdz.tech/terms-and-conditions"
        />

        {/* Additional Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      {/* Background Animated Circles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-red-300/80 blur-[80px] md:blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/40 blur-[60px] md:blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2.4 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-500/40 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main container */}
      <div className="relative z-10">
        <Navbar />

        {/* Main page content starts here in this div!!! */}
        <div className="container mt-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.25,
              type: "spring",
              damping: 10,
              stiffness: 100,
            }}
            className="wrapper flex flex-col items-start justify-center"
          >
            <h1 className="mx-auto mb-8 special w-full text-center text-4xl font-extrabold tracking-tighter text-primary md:mb-12 md:text-5xl">
              Terms & Conditions
            </h1>
            <div className="mx-auto max-w-3xl">
              {tncContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                  }}
                  className="mb-6"
                >
                  <p className="mb-2 text-lg font-medium text-foreground/80">
                    {item.description}
                  </p>
                  {item.points?.map((point) => (
                    <p
                      key={point.id}
                      className="ml-4 mt-2 text-base text-foreground/70"
                    >
                      {point.id}. {point.description}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.main>
        </div>

        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
