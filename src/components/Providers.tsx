"use client";

import { ToastContainer } from "@/components/ui";

// Zustand stores don't need providers - they work globally
// This component includes global UI components like Toast
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
