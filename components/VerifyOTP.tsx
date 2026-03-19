"use client";

import { useVerification } from "@/hooks/useVerification";

const VerifyOTP = () => {
  const { otp, timer, error, handleOtpChange, handleSubmit, handleResend } =
    useVerification();

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
        {/* OTP Inputs */}
        <div className="flex justify-center gap-3">
          {otp.map((value: string, i: number) => (
            <input
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

        {error && <p className="text-sm text-primary text-center">{error}</p>}

        <button
          type="submit"
          className="
            w-full h-[52px]
            bg-blue
            text-white
            font-semibold
            p-2.5
            rounded-xl
            transition
          "
        >
          Verify OTP
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
