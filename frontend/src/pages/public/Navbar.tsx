import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HotelBooking
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
