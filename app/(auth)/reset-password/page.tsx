"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { resetPasswordSchema, ResetPasswordInput } from "@/lib/validations/auth.schema";
import SetPassword from "@/components/SetPassword";

export default function ResetPasswordPage() {
  const { resetPassword } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await resetPassword(data.password, data.confirmPassword);
      router.push("/login");
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <SetPassword
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}
