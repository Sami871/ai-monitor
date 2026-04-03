"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { loginSchema, LoginInput } from "@/lib/validations/auth.schema";
import Login from "@/components/Login";

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } =
    useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data);
      router.push("/");
    } catch (error: any) {
      const msg = error?.response?.data?.detail || error?.message || "Invalid credentials. Please try again.";
      setError("password", { type: "server", message: msg });
      setError("email", { type: "server", message: "" });
    }
  };

  return (
    <Login
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      isSubmitting={isSubmitting}
    />
  );
}