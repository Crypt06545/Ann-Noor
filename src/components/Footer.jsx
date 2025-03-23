import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white py-10 font-robotoCondensed">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section - Newsletter */}
          <div>
            <h2 className="text-xl font-bold text-orange-500 font-robotoSlab">Ann Noor</h2>
            <p className="mt-2 text-sm">
              Receive updates on new arrivals and special promotions!
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email here"
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none"
              />
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-r-md">
                Submit
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              <FiTwitter className="text-xl hover:text-orange-500 cursor-pointer" />
              <FiFacebook className="text-xl hover:text-orange-500 cursor-pointer" />
              <FiLinkedin className="text-xl hover:text-orange-500 cursor-pointer" />
              <FiInstagram className="text-xl hover:text-orange-500 cursor-pointer" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="hover:text-orange-500 cursor-pointer">Fashion</li>
              <li className="hover:text-orange-500 cursor-pointer">Jewelry</li>
              <li className="hover:text-orange-500 cursor-pointer">Sports</li>
              <li className="hover:text-orange-500 cursor-pointer">Electronics</li>
              <li className="hover:text-orange-500 cursor-pointer">Indoor</li>
            </ul>
          </div>

          {/* Shopping */}
          <div>
            <h3 className="text-lg font-semibold">Shopping</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="hover:text-orange-500 cursor-pointer">Payments</li>
              <li className="hover:text-orange-500 cursor-pointer">Delivery options</li>
              <li className="hover:text-orange-500 cursor-pointer">Buyer protection</li>
            </ul>
          </div>

          {/* Customer Care & Pages */}
          <div>
            <h3 className="text-lg font-semibold">Customer Care</h3>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="hover:text-orange-500 cursor-pointer">Help center</li>
              <li className="hover:text-orange-500 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-orange-500 cursor-pointer">Privacy policy</li>
              <li className="hover:text-orange-500 cursor-pointer">Returns & refund</li>
              <li className="hover:text-orange-500 cursor-pointer">Survey & feedback</li>
            </ul>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
          © 2025 Local Ann Noor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;