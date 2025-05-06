"use client";

import SideBar from "./SideBar";
import Image from "next/image";
import { SnackbarProvider } from "notistack";

export default function Layout({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={3000}
    >
      <div
        style={{ background: "var(--color-linear-gradient)" }}
        className="h-screen flex items-center justify-center"
      >
        <div className="relative flex h-[90vh] w-[90vw] bg-[#FFFFFF]/60 mx-auto">
          {/* Sidebar */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{ width: "250px" }}
          >
            <SideBar />
          </div>

          {/* Main content area */}
          <div className="flex-1 ml-[100px] p-2 relative overflow-y-auto">
            {/* Logo at the top-left corner */}
            <Image src="/XOX-logo.png" alt="Logo" width={100} height={100} />
            {children}
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}
