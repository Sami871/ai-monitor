import AvatarProfile from "./components/AvatarProfile";
import PasswordSection from "./components/PasswordSection";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="w-full flex-col flex gap-6" style={{ maxWidth: "652px" }}>
      <AvatarProfile />
      <PasswordSection />
      <div className="flex justify-end pt-2">
        <Button className="w-[205px] h-[52px] text-base font-semibold flex items-center justify-center bg-blue text-primary hover:bg-blue/90 border-none">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
