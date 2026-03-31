import Image from "next/image";
import Logo from "@/assets/image/ai-logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full mx-auto flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-0 md:px-5 pt-10">
        <div className="max-w-[204px] w-full mb-6">
          <Image src={Logo} alt="Logo" className="w-full mx-auto" priority />
        </div>
        <div className="w-full max-w-115.5 bg-secondary border border-default rounded-lg py-7.5 px-5">
          {children}
        </div>
      </div>
    </div>
  );
}
