"use client";

import PasswordInput from "@/components/PasswordInput";

const PasswordSection = () => {
  return (
    <form className="space-y-6 bg-secondary p-6 rounded-xl">
      {/* Current Password */}
      <PasswordInput
        label="Current Password"
        placeholder="Enter Current password"
      />

      {/* New Password */}
      <PasswordInput label="New Password" placeholder="Enter New password" />

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm New password"
      />
    </form>
  );
};

export default PasswordSection;
