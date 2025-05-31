import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

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
            <div className="text-2xl font-bold mb-4">Skye Canyon Homes</div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for luxury real estate in Skye Canyon, Las Vegas. 
              Specializing in premium properties with exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a 
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/properties"
                  className="hover:text-white transition-colors"
                >
                  All Properties
                </a>
              </li>
              <li>
                <a 
                  href="/market-analysis"
                  className="hover:text-white transition-colors"
                >
                  Market Reports
                </a>
              </li>
              <li>
                <a 
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Dr. Duffy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Buyer's Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Seller's Guide</a>
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
                <span>License# 12345678</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Skye Canyon Homes for Sale. All rights reserved. | Dr. Jan Duffy, REALTOR®</p>
          <p className="text-sm mt-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> | 
            <a href="#" className="hover:text-white transition-colors"> Terms of Service</a> | 
            <a href="#" className="hover:text-white transition-colors"> Fair Housing</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
