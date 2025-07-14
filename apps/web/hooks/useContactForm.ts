// hooks/useContactForm.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/contact/`,
        formData
      );
      if (response.status === 200) {
        toast.success("Thank you, we'll get back to you within 24 hours!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Server is down for now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};
