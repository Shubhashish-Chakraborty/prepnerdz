"use client";

import Navbar from "../ui/navbars/Navbar";
import { Instagram } from "@/icons/Instagram";
import { X } from "@/icons/X";
import { Linkedin } from "@/icons/Linkedin";
import InputStraightLine from "../ui/inputs/InputStarightLine";
import { MessageSend } from "@/icons/MessageSend";
import New8 from "../New8";
import { useContactForm } from "../../hooks/useContactForm"; // <-- import custom hook
import { toast } from "react-hot-toast";

export const ContactLanding = () => {
  const { formData, handleChange, handleSubmit, isSubmitting } = useContactForm();

  return (
    <div className="relative min-h-screen bg-[#f9f9fa] text-[#1d1d1f] font-sans p-3">
      <div className="bg-[url('https://images6.alphacoders.com/123/thumb-1920-1232063.jpg')] bg-cover bg-center bg-no-repeat rounded-4xl">
        <Navbar />

        <main className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            {/* LEFT SIDE */}
            <div className="flex-1 space-y-6">
              <h1 className="text-7xl font-semibold tracking-tight">
                Let's Get In Touch
              </h1>
              <p className="text-4xl text-gray-600">
                We’d love to hear from you. Reach out anytime.
              </p>

              <div className="flex space-x-5 mt-6">
                <a
                  href="https://www.instagram.com/___shubhashish___"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-sm hover:scale-105 transition"
                >
                  <Instagram className="size-6 text-pink-600" />
                </a>
                <a
                  href="https://www.x.com/__Shubhashish__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-sm hover:scale-105 transition"
                >
                  <X className="size-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/Shubhashish-Chakraborty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-3 rounded-full shadow-sm hover:scale-105 transition"
                >
                  <Linkedin className="size-6 text-blue-600" />
                </a>
              </div>

              <p className="text-2xl text-gray-700 mt-3">
                Or email us at{" "}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText("business.prepnerdz@gmail.com");
                    toast.success("Email copied to clipboard!");
                  }}
                  className="text-white underline cursor-pointer"
                >
                  business.prepnerdz@gmail.com
                </span>
              </p>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="flex-1">
              <div className="bg-white/10 backdrop-blur-lg border border-gray-200 rounded-[28px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] px-8 py-10 max-w-lg mx-auto">
                <h3 className="text-xl font-semibold text-center mb-8">
                  Have a message for us?
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputStraightLine
                      id="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <InputStraightLine
                      id="email"
                      type="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <InputStraightLine
                    id="phone"
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <InputStraightLine
                    id="message"
                    label="Message"
                    value={formData.message}
                    onChange={handleChange}
                    textarea
                    rows={5}
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#111111] text-white font-medium py-3 rounded-2xl shadow hover:opacity-90 transition"
                  >
                    {isSubmitting ? (
                      <div className="flex justify-center items-center gap-2">
                        Sending... <MessageSend />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        Send Message <MessageSend />
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>

  
      <New8 />
    </div>
  );
};
