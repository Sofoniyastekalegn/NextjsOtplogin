"use client";

import React, { useState } from "react";


const OtpPage: React.FC = () => {
  const [contactInfo, setContactInfo] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState("");

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [isSucess, setIsSucess] = useState(false);


  const validateContactInfo = (info: string): boolean =>  {
    if (deliveryMethod === "email") {
      // refular expression for email validation 
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(info);

    } else if (deliveryMethod === "sms") {
      // regular expression for phone number 

      const re = /^\+?[1-9]\d{1,14}$/;
      return re.test(info);
    }
    return false;
  };
  const handleGenerateOtp = async () => {
    if (!contactInfo) {
      setMessage("Contact information is requried");
      setIsSucess(false);
      return;
    }

    if (!validateContactInfo(contactInfo))  {
      setMessage(
        deliveryMethod === "email"
        ? "Invalid email format"
        : "Invalid phone number format"
      );
      setIsSucess(false);
      return;
    }
    const res = await fetch("/api/auth/otp/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: deliveryMethod === "email" ? contactInfo : undefined,
        phoneNumber: deliveryMethod === "sms" ? contactInfo : undefined,
        deliveryMethod,
      }),
    });
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            OTP Authentication
          </h1>
          );
          export defualt OtpPage;