import Link from "next/link";

const ForgotPassword = () => {
  //   const { email, setEmail, error, handleSubmit } = useForgot();

  return (
    <div className="space-y-10 w-full">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-manrope font-semibold text-primary text-center">
          Forgot Password?
        </h2>

        <p className="text-secondary text-sm md:text-base text-center md:font-medium">
          Enter your email to reset your account access.
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-primary text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 border border-default text-sm rounded-xl px-3.5 py-4.5 outline-none focus:ring"
          />
          {/* {error && <p className="text-sm text-primary mt-1">{error}</p>} */}
        </div>

        <button
          type="submit"
          className="w-full h-13 bg-blue text-white font-semibold p-2.5 rounded-xl transition"
        >
          Send OTP
        </button>
      </form>

      <p className="text-sm text-center text-secondary">
        Back to{" "}
        <Link href="/login" className="text-blue font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
