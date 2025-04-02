// components/Footer.tsx
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-x-16 md:justify-between">
          {/* Company Info */}
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-4">N & N Networks</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for quality equipment rentals. Serving
              contractors and DIY enthusiasts.
            </p>
            {/* <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div> */}
          </div>

          {/* Contact Info */}
          <div className="mt-8 md:mt-0 max-w-md ml-0 md:ml-auto">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <span className="text-gray-400">(888) 350-7661</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <span className="text-gray-400">info@nn-networks.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <span className="text-gray-400">
                  1833 Cheddar loop #714 Austin Texas
                  <br />
                  #714 Austin Texas
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Business Hours</h4>
              <p className="text-gray-400 text-sm">
                Monday-Saturday: 5AM EST - 5PM PDT
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} N & N Networks. All rights reserved.
            </div>
            {/* <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-gray-500 hover:text-white text-sm"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-white text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-500 hover:text-white text-sm"
              >
                Sitemap
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

{
  /* Quick Links */
}
{
  /* <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/equipment"
                  className="text-gray-400 hover:text-white"
                >
                  Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/rental-process"
                  className="text-gray-400 hover:text-white"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div> */
}

{
  /* Equipment Categories */
}
{
  /* <div>
            <h3 className="text-lg font-semibold mb-4">Equipment Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/equipment/excavators"
                  className="text-gray-400 hover:text-white"
                >
                  Excavators
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment/loaders"
                  className="text-gray-400 hover:text-white"
                >
                  Loaders
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment/lifts"
                  className="text-gray-400 hover:text-white"
                >
                  Lifts
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment/compactors"
                  className="text-gray-400 hover:text-white"
                >
                  Compactors
                </Link>
              </li>
              <li>
                <Link
                  href="/equipment/generators"
                  className="text-gray-400 hover:text-white"
                >
                  Generators
                </Link>
              </li>
            </ul>
          </div> */
}
