"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import PasswordInput from "@/components/PasswordInput";
import { ChangePasswordInput } from "@/lib/validations/auth.schema";

interface PasswordSectionProps {
  register: UseFormRegister<ChangePasswordInput>;
  errors: FieldErrors<ChangePasswordInput>;
}

const PasswordSection = ({ register, errors }: PasswordSectionProps) => {
  return (
    <div className="space-y-6 bg-secondary p-6 rounded-xl">
      <PasswordInput
        label="Current Password"
        placeholder="Enter Current password"
        {...register("current_password")}
        error={errors.current_password?.message}
      />

      <PasswordInput
        label="New Password"
        placeholder="Enter New password"
        {...register("new_password")}
        error={errors.new_password?.message}
      />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm New password"
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
      />
    </div>
  );
};

export default PasswordSection;
