import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Jan Duffy | Skye Canyon Real Estate Expert Las Vegas NV",
  description: "Learn about Dr. Jan Duffy's expertise in Skye Canyon real estate, luxury homes, and personalized service for buyers and sellers in Las Vegas NV 89166.",
  openGraph: {
    title: "About Dr. Jan Duffy | Skye Canyon Real Estate Expert",
    description: "Premier Skye Canyon real estate specialist with 15+ years of exclusive community expertise in Las Vegas NV.",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Dr. Jan Duffy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premier Skye Canyon Real Estate Specialist with 15+ Years of Exclusive Community Expertise
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your Trusted Skye Canyon Real Estate Expert
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Dr. Jan Duffy brings unparalleled expertise and dedication to Skye Canyon real estate, 
              serving clients throughout Las Vegas NV 89166 with exceptional results and personalized service.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              With over 15 years of experience specializing in luxury homes, new construction, and 
              golf course properties, Dr. Duffy has established herself as the go-to expert for 
              discerning buyers and sellers in Skye Canyon.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Her deep understanding of the local market, builder relationships, and community 
              amenities ensures clients receive the highest level of service and achieve their 
              real estate goals with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Professional Credentials & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Licenses & Certifications</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Nevada Real Estate License S.0197614</li>
                <li>• REALTOR® Designation</li>
                <li>• Luxury Home Specialist Certification</li>
                <li>• New Construction Specialist</li>
                <li>• First-Time Buyer Expert</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Areas of Expertise</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Skye Canyon Communities</li>
                <li>• Golf Course Properties</li>
                <li>• Luxury Home Sales</li>
                <li>• New Construction</li>
                <li>• Investment Properties</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work with a Skye Canyon Expert?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact Dr. Jan Duffy today for personalized real estate guidance in Las Vegas NV 89166
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(702) 500-1902"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Call (702) 500-1902
            </a>
            <a
              href="mailto:DrDuffy@SkyeCanyonHomesForSale.com"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
