"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// OTP schema: exactly 4 digits
const otpSchema = z
  .string()
  .length(4, "Enter complete 4-digit OTP")
  .regex(/^\d{4}$/, "OTP must contain only numbers");

export const useVerification = () => {
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [error, setError] = useState<string>("");

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  // Submit OTP
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    // Validate with Zod
    const result = otpSchema.safeParse(enteredOtp);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    // Dummy verification
    if (enteredOtp === "1234") {
      router.push("/set-password"); // Next.js navigation
    } else {
      setError("Invalid OTP, please try again");
    }
  };

  // Resend OTP
  const handleResend = () => {
    if (timer === 0) {
      setOtp(["", "", "", ""]);
      setTimer(60);
      setError("");

      console.log("OTP resent!"); // replace with API call
    }
  };

  return {
    otp,
    timer,
    error,
    handleOtpChange,
    handleSubmit,
    handleResend,
  };
};
