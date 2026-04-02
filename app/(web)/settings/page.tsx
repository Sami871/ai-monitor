"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AvatarProfile from "./components/AvatarProfile";
import PasswordSection from "./components/PasswordSection";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/store/useProfileStore";
import { authApi } from "@/lib/api/auth.api";
import {
  changePasswordSchema,
  ChangePasswordInput,
} from "@/lib/validations/auth.schema";

export default function SettingsPage() {
  const { name, setProfile } = useProfileStore();
  const [displayName, setDisplayName] = useState(name);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSaveAll = async (data: ChangePasswordInput) => {
    setLoading(true);
    setMessage(null);
    try {
      if (displayName !== name) {
        await setProfile({ name: displayName });
      }
      if (data.current_password || data.new_password || data.confirm_password) {
        await authApi.changePassword(data);
        reset();
      }

      setMessage({ text: "Settings updated successfully!", type: "success" });
    } catch (error: any) {
      console.error("Save error:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to update settings",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSaveAll)}
      className="w-full flex-col flex gap-6"
      style={{ maxWidth: "652px" }}
    >
      <AvatarProfile displayName={displayName} onNameChange={setDisplayName} />
      <PasswordSection register={register} errors={errors} />

      {message && (
        <p
          className={`text-sm font-medium ${
            message.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="w-[205px] h-[52px] text-base font-semibold flex items-center justify-center bg-blue text-primary hover:bg-blue/90 border-none disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
