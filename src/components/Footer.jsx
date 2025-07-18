import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { navigationData } from "../constants/navigation";

const Footer = () => {
  const publicLinks = navigationData.filter((link) => !link.private);

  return (
    <footer className="bg-green-900 text-white py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: support@thegardenHub.com</p>
          <p>Phone: +1 (234) 567-8901</p>
          <p>Address: 123 Garden Way, Bloomville, USA</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1">
            {publicLinks.map((item) => (
              <li key={item.id}>
                <Link to={item.path} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="hover:text-green-300 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-green-300 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-green-300 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-6 text-green-200">
        © {new Date().getFullYear()} 🌿The Garden Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
