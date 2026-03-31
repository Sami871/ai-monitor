"use client";

import PasswordInput from "@/components/PasswordInput";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ResetPasswordInput } from "@/lib/validations/auth.schema";

interface SetPasswordProps {
  register: UseFormRegister<ResetPasswordInput>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<ResetPasswordInput>;
  isSubmitting: boolean;
}

const SetPassword = ({ register, handleSubmit, errors, isSubmitting }: SetPasswordProps) => {
  return (
    <div className="space-y-10 w-full">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center">
          Set New Password
        </h2>

        <p className="text-secondary text-sm md:text-base text-center md:font-medium">
          Choose a strong password to secure your account.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <PasswordInput
          {...register("password")}
          label="Password"
          placeholder="Enter your new password"
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}

        <div className="mt-4">
          <PasswordInput
            {...register("confirmPassword")}
            label="Confirm Password"
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue text-white h-13 p-2.5 rounded-xl mt-6 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default SetPassword;

