"use client";

import React from "react";
import { Check } from "lucide-react";

interface CheckBoxProps {
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`
          w-4.5 h-4.5 flex items-center justify-center
          border-2 rounded
          transition
          ${checked ? "bg-[#3B82F6] border-[#3B82F6]" : "border-[#3B82F6]"}
        `}
      >
        {checked && <Check className="w-3.5 h-3.5 text-white" />}
      </div>

      {label && <span className="text-sm text-primary">{label}</span>}
    </label>
  );
};

export default CheckBox;
