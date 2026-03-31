"use client";

import { useState, useEffect, useCallback } from "react";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";
import { OtpInput } from "@/lib/validations/auth.schema";
import { useAuthStore } from "@/store/useAuthStore";

interface VerifyOTPProps {
  register: UseFormRegister<OtpInput>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<OtpInput>;
  isSubmitting: boolean;
  setValue: UseFormSetValue<OtpInput>;
}

const VerifyOTP = ({ handleSubmit, errors, isSubmitting, setValue }: VerifyOTPProps) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(60);
  const [resendError, setResendError] = useState<string | null>(null);
  const { forgotPassword, pendingEmail } = useAuthStore();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
      const updated = [...otp];
      updated[index] = value.slice(-1);
      setOtp(updated);

      // Sync manually with react-hook-form state
      setValue("otp", updated.join(""), { shouldValidate: true });

      if (value && index < 3) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    },
    [otp, setValue],
  );

  const handleResend = async () => {
    if (!pendingEmail) return;
    setResendError(null);
    try {
      await forgotPassword({ email: pendingEmail });
      setTimer(60);
      setOtp(["", "", "", ""]);
      setValue("otp", "");
    } catch {
      setResendError("Failed to resend OTP.");
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-manrope font-semibold text-primary text-center">
          Verify OTP
        </h2>

        <p className="text-secondary text-sm md:text-base text-center font-medium">
          Enter OTP sent to your Email.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-3">
          {otp.map((value: string, i: number) => (
            <input
              id={`otp-${i}`}
              key={i}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              className="
                w-14 h-14
                border border-default
                text-center text-lg font-semibold
                rounded-xl
                outline-none
                focus:ring focus-ring-primary
                transition
              "
            />
          ))}
        </div>

        {(errors.otp || resendError) && (
          <p className="text-sm text-red-500 text-center">
            {errors.otp?.message || resendError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full h-13
            bg-blue
            text-white
            font-semibold
            p-2.5
            rounded-xl
            transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <p className="text-sm text-center text-secondary">
        {timer > 0
          ? `00:${timer.toString().padStart(2, "0")}`
          : "You can resend OTP now."}{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={timer > 0}
          className={`text-blue font-normal hover:underline ${
            timer > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Resend
        </button>
      </p>
    </div>
  );
};

export default VerifyOTP;
