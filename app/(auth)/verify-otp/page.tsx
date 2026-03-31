"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { otpSchema, OtpInput } from "@/lib/validations/auth.schema";
import VerifyOTP from "@/components/VerifyOTP";

export default function VerifyOtpPage() {
  const { verifyOtp } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (data: OtpInput) => {
    try {
      await verifyOtp(data.otp);
      router.push("/reset-password");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <VerifyOTP
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      isSubmitting={isSubmitting}
      setValue={setValue}
    />
  );
}
