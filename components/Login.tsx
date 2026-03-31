"use client";

import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";
import CheckBox from "@/components/CheckBox";
import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { LoginInput } from "@/lib/validations/auth.schema";

interface LoginProps {
  register: UseFormRegister<LoginInput>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  errors: FieldErrors<LoginInput>;
  isSubmitting: boolean;
}

const Login = ({ register, handleSubmit, errors, isSubmitting }: LoginProps) => {
  const [remember, setRemember] = useState<boolean>(false);

  return (
    <div className="w-full space-y-10">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center">
          Welcome Back
        </h2>

        <p className="text-secondary text-sm md:text-base text-center font-medium">
          Sign in to monitor activity, track counts, and view reports.
        </p>
      </div>

       <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-primary text-sm">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your Email"
            className="w-full h-13 mt-3 border border-default rounded-xl px-3 text-sm outline-none focus:ring focus-ring-primary"
          />
          {errors.email && (
            <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        <PasswordInput
          {...register("password")}          
          placeholder="Enter Your Password"
          label="Password"
        />
        {errors.password && (
          <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
        )}

        <div className="flex items-center justify-between text-sm">
          <CheckBox
            label="Remember me"
              checked={remember}
            onChange={setRemember}
          />

          <Link href="/forgot-password" className="text-blue">
            Forgot password?
          </Link>
        </div>

        {/* rest of UI exactly as-is */}
        <button type="submit" disabled={isSubmitting}
          className="w-full h-13 bg-blue text-white p-2.5 rounded-xl transition">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
