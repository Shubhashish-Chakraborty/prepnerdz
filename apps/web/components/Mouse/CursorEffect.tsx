"use client";

import { Toaster } from "react-hot-toast";
import BackToTopButton from "../ui/BackToTopButton";
import AskNerd from "@/components/ui/AskNerd";
import GssocBanner from "@/components/ui/GssocBanner";
import { useEffect } from "react";

export default function CursorEffect({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
      cursor.style.top = e.pageY - 10 + "px";
      cursor.style.left = e.pageX - 10 + "px";
    });
  }, []);

  return (
    <>
      <GssocBanner />
      {children}
      <AskNerd />
      <BackToTopButton />
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 999999,
        }}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            zIndex: 999999,
          },
        }}
      />
      <div className="cursor" />
    </>
  );
}
