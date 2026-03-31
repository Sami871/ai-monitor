"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/lib/validations/auth.schema";
import ForgotPassword from "@/components/ForgotPassword";

export default function Page() {
  const { forgotPassword } = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordInput) => {
    await forgotPassword(data);
    router.push("/verify-otp");
  };

  return (
    <ForgotPassword
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}