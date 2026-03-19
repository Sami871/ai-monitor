import PasswordInput from "@/components/PasswordInput";

const SetPassword = () => {
  //   const {
  //     password,
  //     setPassword,
  //     confirmPassword,
  //     setConfirmPassword,
  //     errors,
  //     handleSubmit,
  //   } = useSetPassword();

  return (
    <div className="space-y-10 w-full">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center">
          Set New Password
        </h2>

        <p className="text-secondary text-sm md:text-base text-center md:font-medium">
          Choose a strong password to secure your account.
        </p>
      </div>

      <form className="space-y-4">
        <PasswordInput
          label="Password"
          placeholder="Enter your new password"
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
          //   error={errors?.password ? errors.password[0] : null}
        />

        {/* {errors?.password && (
          <p className="text-sm text-primary mt-1">{errors.password[0]}</p>
        )} */}

        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          //   value={confirmPassword}
          //   onChange={(e) => setConfirmPassword(e.target.value)}
          //   error={errors?.confirmPassword ? errors.confirmPassword[0] : null}
        />

        {/* {errors?.confirmPassword && (
          <p className="text-sm text-primary mt-1">{errors.confirmPassword[0]}</p>
        )} */}

        <button
          type="submit"
          className="w-full bg-blue text-white h-[52px] p-2.5 rounded-xl transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default SetPassword;
