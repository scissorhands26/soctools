import type { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SOC Tools",
  description: "Collection of Security Operations Center analysis tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("min-h-screen bg-black")}>
      <div className="container mx-auto pt-10">{children}</div>
    </div>
  );
}
