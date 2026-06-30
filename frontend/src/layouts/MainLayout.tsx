import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            HotelBooking
          </Link>

          {/* Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/hotels"
              className="text-gray-700 hover:text-blue-600"
            >
              Hotels
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h2 className="text-xl font-bold mb-4">
                HotelBooking
              </h2>

              <p className="text-gray-400">
                Find the best hotels, resorts and apartments
                worldwide at the best price.
              </p>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">
                Company
              </h3>

              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/">Hotels</Link>
                </li>

                <li>
                  <Link to="/">About</Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">
                Support
              </h3>

              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Booking Support</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">
                Contact
              </h3>

              <ul className="space-y-2 text-gray-400">
                <li>support@hotelbooking.com</li>
                <li>+855 12 345 678</li>
                <li>Phnom Penh, Cambodia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-gray-400">
            © {new Date().getFullYear()} HotelBooking.
            All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;