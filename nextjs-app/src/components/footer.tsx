import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Dr. Jan Duffy REALTOR®</h3>
            <p className="text-gray-300 mb-4">
              Premier Skye Canyon Real Estate Specialist
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:(702) 500-1902" className="hover:text-blue-400 transition-colors">
                  (702) 500-1902
                </a>
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Email:</span>{" "}
                <a 
                  href="mailto:DrDuffy@SkyeCanyonHomesForSale.com" 
                  className="hover:text-blue-400 transition-colors"
                >
                  DrDuffy@SkyeCanyonHomesForSale.com
                </a>
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Address:</span> 10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Dr. Duffy
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Luxury Home Sales</li>
              <li className="text-gray-300">New Construction</li>
              <li className="text-gray-300">Golf Course Properties</li>
              <li className="text-gray-300">Home Valuations</li>
              <li className="text-gray-300">Market Analysis</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Dr. Jan Duffy REALTOR®. All rights reserved. | 
            Skye Canyon Real Estate Expert | Las Vegas NV 89166
          </p>
        </div>
      </div>
    </footer>
  );
}
