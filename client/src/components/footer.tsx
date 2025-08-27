// Social media links with text labels

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">Skye Canyon</div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for luxury real estate in Skye Canyon, Las Vegas. Specializing in
              premium properties with exceptional service.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/skyecanyonhomes"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com/skyecanyonhomes"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com/in/drjanduffy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://youtube.com/@skyecanyonhomes"
                className="text-gray-400 hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/properties" className="hover:text-white transition-colors">
                  All Properties
                </a>
              </li>
              <li>
                <a href="/market-analysis" className="hover:text-white transition-colors">
                  Market Reports
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Dr. Duffy
                </a>
              </li>
              <li>
                <a href="/skye-canyon-schools" className="hover:text-white transition-colors">
                  Skye Canyon Schools
                </a>
              </li>
              <li>
                <a href="/skye-canyon-parks" className="hover:text-white transition-colors">
                  Skye Canyon Parks
                </a>
              </li>
              <li>
                <a href="/skye-canyon-communities" className="hover:text-white transition-colors">
                  New Construction
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Buyer's Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Seller's Guide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <span className="mr-3">📞</span>
                <span>(702) 500-1902</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">✉️</span>
                <span>DrDuffy@SkyeCanyonHomesForSale.com</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">📍</span>
                <span>10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3">🆔</span>
                <span>Nevada License# S.0197614</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-600">
              <h5 className="text-sm font-semibold mb-3 text-white">Business Hours</h5>
              <div className="space-y-1 text-sm text-gray-400">
                <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                <div>Saturday: 9:00 AM - 5:00 PM</div>
                <div>Sunday: 11:00 AM - 4:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Skye Canyon Homes for Sale. All rights reserved. | Dr. Jan Duffy, REALTOR®
          </p>
          <p className="text-sm mt-2">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>{' '}
            |
            <a href="#" className="hover:text-white transition-colors">
              {' '}
              Terms of Service
            </a>{' '}
            |
            <a href="#" className="hover:text-white transition-colors">
              {' '}
              Fair Housing
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
