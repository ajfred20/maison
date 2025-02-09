"use client";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SearchDialog } from "@/components/search-dialog";

export function Navigation() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-medium text-[#8B7355]">
            maison
          </Link>

          <div className="hidden md:flex items-center gap-8 text-neutral-600">
            <Link
              href="/shop"
              className={`hover:text-[#8B7355] transition-colors ${
                isActive("/shop") ? "text-[#8B7355]" : ""
              }`}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className={`hover:text-[#8B7355] transition-colors ${
                isActive("/collections") ? "text-[#8B7355]" : ""
              }`}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className={`hover:text-[#8B7355] transition-colors ${
                isActive("/about") ? "text-[#8B7355]" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hover:text-[#8B7355] transition-colors ${
                isActive("/contact") ? "text-[#8B7355]" : ""
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-neutral-600 hover:text-[#8B7355] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href="/cart"
              className="text-neutral-600 hover:text-[#8B7355] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>

            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <span className="hidden md:inline text-neutral-600 hover:text-[#8B7355] transition-colors">
                    Login
                  </span>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="hidden md:block bg-[#8B7355] text-white px-4 py-2 rounded-full text-sm hover:bg-[#7A6548] transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-neutral-600 hover:text-[#8B7355] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/shop"
              className={`block hover:text-[#8B7355] transition-colors ${
                isActive("/shop") ? "text-[#8B7355]" : "text-neutral-600"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/collections"
              className={`block hover:text-[#8B7355] transition-colors ${
                isActive("/collections") ? "text-[#8B7355]" : "text-neutral-600"
              }`}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className={`block hover:text-[#8B7355] transition-colors ${
                isActive("/about") ? "text-[#8B7355]" : "text-neutral-600"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block hover:text-[#8B7355] transition-colors ${
                isActive("/contact") ? "text-[#8B7355]" : "text-neutral-600"
              }`}
            >
              Contact
            </Link>
            {!isSignedIn && (
              <div className="pt-4 border-t border-neutral-200 space-y-4">
                <SignInButton mode="modal">
                  <span className="block text-neutral-600 hover:text-[#8B7355] transition-colors">
                    Login
                  </span>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full bg-[#8B7355] text-white px-4 py-2 rounded-full text-sm hover:bg-[#7A6548] transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        )}

        <SearchDialog
          isOpen={isSearchOpen}
          onOpenChangeAction={setIsSearchOpen}
        />
      </div>
    </nav>
  );
}
