import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Contact Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Las Vegas NV 89166</title>
        <meta
          name="description"
          content="Contact Dr. Jan Duffy, top-rated Skye Canyon REALTOR® in Las Vegas, NV 89166. Expert assistance for luxury homes, golf course properties, and new construction. Call (702) 500-1902 today."
        />
        <meta
          name="keywords"
          content="contact Dr. Jan Duffy REALTOR, Skye Canyon real estate contact, Las Vegas NV 89166, luxury home specialist, Desert Highlands Golf Course, consultation"
        />

        {/* Geo-specific meta tags */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.2648;-115.3275" />
        <meta name="geo.zipcode" content="89166" />

        {/* Enhanced Open Graph tags */}
        <meta
          property="og:title"
          content="Contact Dr. Jan Duffy REALTOR® | Skye Canyon Real Estate Las Vegas NV"
        />
        <meta
          property="og:description"
          content="Contact Dr. Jan Duffy, top-rated Skye Canyon REALTOR® for expert assistance with luxury homes and golf course properties in Las Vegas, NV 89166."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/contact" />
        <meta
          property="og:image"
          content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg"
        />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Dr. Jan Duffy REALTOR® | Skye Canyon Expert" />
        <meta
          name="twitter:description"
          content="Expert assistance for luxury homes and golf course properties in Las Vegas, NV 89166. Call (702) 500-1902."
        />
        <meta
          name="twitter:image"
          content="https://skyecanyonhomesforsale.com/dr-jan-duffy-headshot.jpg"
        />

        <link rel="canonical" href="https://skyecanyonhomesforsale.com/contact" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Dr. Jan Duffy - Skye Canyon Real Estate',
            description:
              'Contact information for Dr. Jan Duffy, Skye Canyon real estate specialist',
            url: 'https://skyecanyonhomesforsale.com/contact',
            mainEntity: {
              '@type': 'RealEstateAgent',
              name: 'Dr. Jan Duffy',
              telephone: '(702) 500-1902',
              email: 'DrDuffy@SkyeCanyonHomesForSale.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '10111 W. Skye Canyon Park Drive',
                addressLocality: 'Las Vegas',
                addressRegion: 'NV',
                postalCode: '89166',
                addressCountry: 'US',
              },
            },
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Dr. Jan Duffy</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Ready to find your dream home in Skye Canyon? Get expert guidance from Las Vegas's
              premier luxury real estate specialist.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(702) 555-0123"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Property Interest</label>
                        <select
                          value={formData.propertyType}
                          onChange={(e) =>
                            setFormData({ ...formData, propertyType: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select property type</option>
                          <option value="luxury-home">Luxury Home</option>
                          <option value="golf-course">Golf Course Property</option>
                          <option value="new-construction">New Construction</option>
                          <option value="resale">Resale Home</option>
                          <option value="investment">Investment Property</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your real estate needs..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Phone className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold">Phone</h3>
                          <p className="text-gray-600">(702) 500-1902</p>
                          <p className="text-sm text-gray-500">
                            Available 9 AM - 6 PM, Monday - Friday
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <Mail className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p className="text-gray-600">DrDuffy@SkyeCanyonHomesForSale.com</p>
                          <p className="text-sm text-gray-500">
                            Response within 2 hours during business hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                        <div>
                          <h3 className="font-semibold">Office Location</h3>
                          <p className="text-gray-600">10111 W. Skye Canyon Park Drive</p>
                          <p className="text-gray-600">Las Vegas, NV 89166</p>
                          <p className="text-sm text-gray-500">By appointment only</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4">Why Choose Dr. Jan Duffy?</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        15+ years Skye Canyon market expertise
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        Luxury home specialist with proven results
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        Personalized service and market insights
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        Nevada Real Estate License #S.0197614
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Business Hours */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Business Hours</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Monday - Friday</h3>
                <p className="text-gray-600">9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Saturday</h3>
                <p className="text-gray-600">9:00 AM - 5:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sunday</h3>
                <p className="text-gray-600">11:00 AM - 4:00 PM</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Emergency consultations available outside business hours by appointment.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
