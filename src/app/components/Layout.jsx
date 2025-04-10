import SideBar from "./SideBar";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div
      style={{ background: "var(--color-linear-gradient)" }}
      className="h-screen flex items-center justify-center"
    >
      <div className="relative flex h-[90vh] w-[90vw] bg-[#FFFFFF]/60 mx-auto mt-10">
        <div
          className="absolute top-0 left-0 h-full"
          style={{ width: "250px" }}
        >
          <SideBar />
        </div>

        {/* Main content area */}
        <div className="flex-1 ml-[100px] p-2 relative overflow-y-auto">
          {/* Logo at the top-left corner */}
          <Image
            src="/XOX-logo.png" // Direct path to the logo in the public folder
            alt="Logo"
            width={100} // Set width
            height={100} // Set height
          />
          {children}
        </div>
      </div>
    </div>
  );
}
