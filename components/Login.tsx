"use client";

import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";
import CheckBox from "@/components/CheckBox";
// import { useLogin } from "./core/useLogin";
// import { useTranslation } from "react-i18next";
import { useState } from "react";

const Login = () => {
  //   const { email, password, error, setEmail, setPassword, handleSubmit } =
  //     useLogin();

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

      <form className="space-y-4">
        <div>
          <label className="block text-primary text-sm">Email</label>

          <input
            type="email"
            placeholder="Enter your Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="
              w-full h-13 mt-3
              border border-default rounded-xl
              px-3 text-sm
              outline-none
              focus:ring focus-ring-primary
            "
          />

          {/* {error?.email && (
            <p className="text-sm text-primary mt-1">{error.email[0]}</p>
          )} */}
        </div>

        <PasswordInput
          placeholder="Enter Your Password"
          label="Password"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
        />

        {/* {error?.password && (
          <p className="text-sm text-primary mt-1">{error.password[0]}</p>
        )} */}

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

        {/* {error?.form && (
          <p className="text-sm text-primary font-medium">{error.form[0]}</p>
        )} */}

        <button
          type="submit"
          className="w-full h-13 bg-blue text-white p-2.5 rounded-xl transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
