import { ReactNode } from "react";
import { Metadata } from "next";

import StreamClientProvider from "@/providers/StreamClientProvider";

export const metadata: Metadata = {
  title: "PA Meet",
  description: "Your online meeting app",
  icons: { icon: "/icons/logo.svg" },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default RootLayout;
