import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Skye Canyon Homes for Sale - Dr. Jan Duffy</title>
        <meta
          name="description"
          content="Privacy policy for SkyeCanyonHomesForSale.com. Learn how we protect your personal information when using our real estate services."
        />
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/privacy-policy" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: June 3, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fill out contact forms or property inquiry forms</li>
                <li>Subscribe to our newsletter or market updates</li>
                <li>Schedule property viewings or consultations</li>
                <li>Use our voice search feature</li>
                <li>Interact with our website analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide real estate services and property recommendations</li>
                <li>Respond to your inquiries and communicate with you</li>
                <li>Send you relevant market updates and property listings</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third
                parties except:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in our operations</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>File a complaint with relevant authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-white p-6 rounded-lg">
                <p>
                  <strong>Dr. Jan Duffy</strong>
                </p>
                <p>Phone: (702) 500-1902</p>
                <p>Email: DrDuffy@SkyeCanyonHomesForSale.com</p>
                <p>Address: 10111 W. Skye Canyon Park Drive, Las Vegas, NV 89166</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
