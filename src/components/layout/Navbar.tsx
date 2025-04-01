"use client";

// components/Navbar.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ShoppingCart, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import AnimatedLink from "../common/AnimatedLink";

// Define custom animations
const customStyles = `
@keyframes dropdownOpen {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  70% {
    transform: translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdownClose {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  30% {
    transform: translateY(-3px);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}

.animate-dropdown-open {
  animation: dropdownOpen 0.4s ease-out forwards;
}

.animate-dropdown-close {
  animation: dropdownClose 0.4s ease-in forwards;
}
`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [closingDropdown, setClosingDropdown] = useState(null);
  const pathname = usePathname();

  // For mobile dropdown
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

  // Check if current page is home page
  const isHomePage = pathname === "/";

  // Make navbar transparent on home page, solid elsewhere
  const navbarBgClass = isHomePage ? "bg-[#1D1D1D]/20" : "bg-[#1D1D1D]";

  // Handle hover enter
  const handleDropdownEnter = (index) => {
    setClosingDropdown(null);
    setActiveDropdown(index);
  };

  // Handle hover leave with animation
  const handleDropdownLeave = (index) => {
    setClosingDropdown(index);
    setActiveDropdown(null);

    // Reset closing state after animation completes
    setTimeout(() => {
      setClosingDropdown(null);
    }, 400); // Same duration as the animation
  };

  // Toggle mobile dropdown function
  const toggleMobileDropdown = (index) => {
    if (mobileActiveDropdown === index) {
      setMobileActiveDropdown(null);
    } else {
      setMobileActiveDropdown(index);
    }
  };

  // Dropdown menu data
  const dropdownMenus = [
    {
      title: "Equipment Rentals",
      items: [
        { name: "Backhoes", href: "/products/backhoes" },
        { name: "Excavators", href: "/products/excavators" },
        { name: "Loaders", href: "/products/loaders" },
        { name: "Bulldozers", href: "/products/bulldozers" },
        { name: "Trenchers", href: "/products/trenchers" },
      ],
    },
    {
      title: "Solutions",
      items: [
        { name: "Residential Projects", href: "/solutions/residential" },
        { name: "Commercial Construction", href: "/solutions/commercial" },
        { name: "Industrial Solutions", href: "/solutions/industrial" },
        { name: "Landscaping", href: "/solutions/landscaping" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "Category", href: "/browse/category" },
        { name: "Brand", href: "/browse/brand" },
        { name: "Price", href: "/browse/price" },
        { name: "Popularity", href: "/browse/popular" },
      ],
    },
  ];

  return (
    <header className={`${isHomePage ? "absolute w-full z-10" : ""}`}>
      {/* Add custom styles for animations */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Top black bar */}
      {isHomePage && (
        <div className="bg-black text-white py-2 px-4 px-30">
          <div className="container mx-auto flex justify-between items-center text-xs">
            <div className="flex space-x-4">
              <button className="hover:text-yellow-400">English</button>
              <div className="flex space-x-2">
                <Link href="#" className="hover:text-yellow-400">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-yellow-400">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-yellow-400">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <span className="text-sm">
                Join our team. Are you ready to change the game?{" "}
                <Link href="#" className="text-yellow-400 hover:underline">
                  Find out more →
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${navbarBgClass} text-white transition-colors duration-300 px-25`}
      >
        <div className="container mx-auto px-4 py-3 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Logo */}
              <div>
                <Link href="/" className="flex items-center">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <div className="bg-yellow-500 h-9 w-9 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <span className="text-xl font-bold tracking-wider">
                        N & N Networks
                      </span>
                      <div className="text-xs">CONSTRUCTION SERVICES</div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Call Us - now directly next to logo */}
              <div className="hidden md:flex items-center border-l border-gray-700 pl-4 ml-4">
                <div className="mr-2">
                  <Phone className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Call Us on Expert</div>
                  <div className="font-bold">+1 910 730 09</div>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              {/* Dropdown menus */}
              {dropdownMenus.map((menu, index) => (
                <div
                  key={index}
                  className="relative group py-5"
                  onMouseEnter={() => handleDropdownEnter(index)}
                  onMouseLeave={() => handleDropdownLeave(index)}
                >
                  <button
                    className={`flex items-center justify-between font-medium hover:text-yellow-500 ${
                      activeDropdown === index ? "text-yellow-500" : ""
                    }`}
                  >
                    {menu.title}
                    <svg
                      className="ml-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {/* Dropdown content */}
                  <div
                    className={`absolute left-0 mt-2 w-48 bg-black shadow-lg z-10 transition-all duration-300 transform ${
                      activeDropdown === index
                        ? "opacity-100 visible translate-y-0 animate-dropdown-open"
                        : closingDropdown === index
                        ? "opacity-100 visible animate-dropdown-close"
                        : "opacity-0 invisible translate-y-4"
                    }`}
                  >
                    <div className="py-2">
                      {menu.items.map((item, idx) => (
                        <div key={idx} className="px-4 py-2">
                          <AnimatedLink
                            href={item.href}
                            className="block w-full"
                          >
                            {item.name}
                          </AnimatedLink>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href="/service-areas"
                className="py-5 font-medium hover:text-yellow-500"
              >
                Service Area
              </Link>
            </nav>

            {/* Cart & Call button */}
            <div className="flex items-center">
              <Link
                href="/contact"
                className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 text-sm"
              >
                REQUEST A CALL
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${navbarBgClass} border-t border-gray-700`}>
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 py-4">
              <Link
                href="/"
                className="py-2 text-white hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile dropdown menus */}
              {dropdownMenus.map((menu, index) => (
                <div key={index} className="py-2">
                  <button
                    className={`flex items-center justify-between w-full text-left ${
                      mobileActiveDropdown === index
                        ? "text-yellow-500"
                        : "text-white"
                    } hover:text-yellow-500`}
                    onClick={() => toggleMobileDropdown(index)}
                  >
                    {menu.title}
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileActiveDropdown === index ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {mobileActiveDropdown === index && (
                    <div className="pl-4 mt-2 border-l border-gray-700">
                      {menu.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="block py-2 text-sm text-white hover:text-yellow-500 transition-transform duration-200 hover:translate-x-1"
                          onClick={() => {
                            setMobileActiveDropdown(null);
                            setIsMenuOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/service-areas"
                className="py-2 text-white hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Services Area
              </Link>

              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>+1 910 730 09</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
