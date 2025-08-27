import { Helmet } from 'react-helmet-async';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Skye Canyon Homes for Sale - Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Terms of service for SkyeCanyonHomesForSale.com real estate services provided by Dr. Jan Duffy in Las Vegas, Nevada."
        />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/terms-of-service" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: June 3, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using SkyeCanyonHomesForSale.com, you accept and agree to be bound
                by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Real Estate Services</h2>
              <p className="mb-4">
                Dr. Jan Duffy is a licensed real estate professional in Nevada (License #S.0197614).
                All real estate services are provided in accordance with Nevada state regulations
                and the National Association of Realtors Code of Ethics.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Website Usage</h2>
              <p className="mb-4">
                You may use our website for legitimate real estate research and inquiry purposes.
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Use automated systems to extract data without permission</li>
                <li>Interfere with website security or functionality</li>
                <li>Transmit harmful or malicious content</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Property Information</h2>
              <p className="mb-4">
                Property listings and market data are provided for informational purposes. While we
                strive for accuracy, information may change without notice. All property details
                should be independently verified.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                Dr. Jan Duffy and SkyeCanyonHomesForSale.com shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages resulting from your use of
                our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by and construed in accordance with the laws of the
                State of Nevada.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="bg-white p-6 rounded-lg">
                <p>
                  <strong>Dr. Jan Duffy, REALTOR</strong>
                </p>
                <p>Nevada License #S.0197614</p>
                <p>Phone: (702) 500-1902</p>
                <p>Email: DrDuffy@SkyeCanyonHomesForSale.com</p>
                <p>Office: 10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
