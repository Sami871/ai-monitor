"use client";

import { useState, InputHTMLAttributes } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = "Password",
  placeholder = "Enter your password",
  error,
  ...props
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="w-full">
      <label className="block text-primary text-sm">{label}</label>

      <div className="relative mt-3">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="current-password"
          className="w-full h-13 border border-default rounded-xl px-3 text-sm
            outline-none focus:ring focus-ring-primary"
          {...props}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center
            text-secondary cursor-pointer"
        >
          {show ? (
            <EyeClosed className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
