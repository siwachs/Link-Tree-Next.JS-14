import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b flex justify-between p-4">
      <div className="flex gap-6">
        <Link href="/">LinkTree</Link>

        <nav className="flex items-center gap-4 text-slate-500 text-sm">
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      <nav className="flex gap-4 text-sm text-slate-500">
        <Link href="/signin">Sign in</Link>
        <Link href="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
