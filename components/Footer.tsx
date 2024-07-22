import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 px-4 md:px-6">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; 2024 SOC Toolkit. All rights reserved.</p>
        <nav className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Terms
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
