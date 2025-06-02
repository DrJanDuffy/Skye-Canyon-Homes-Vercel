import { Helmet } from "react-helmet-async";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import FAQSection from "@/components/faq-section";
import { GraduationCap, School, Users, MapPin, Star, Clock, BookOpen } from "lucide-react";

const elementarySchools = [
  {
    name: "William & Mary Scherkenbach Elementary School",
    type: "Public Elementary (K-5)",
    district: "Clark County School District"
  },
  {
    name: "James Bilbray Elementary School", 
    type: "Public Elementary (K-5)",
    district: "Clark County School District"
  },
  {
    name: "Kenneth Divich Elementary",
    type: "Public Elementary (K-5)", 
    district: "Clark County School District"
  }
];

const middleSchools = [
  {
    name: "Ralph Cadwallader Middle School",
    type: "Public Middle School",
    district: "Clark County School District"
  },
  {
    name: "Edmundo Escobedo Sr Middle School",
    type: "Public Middle School",
    district: "Clark County School District"
  }
];

const highSchools = [
  {
    name: "Arbor View High School",
    type: "Public High School",
    district: "Clark County School District"
  }
];

const charterSchools = [
  {
    name: "Somerset Academy – Skye Canyon Campus",
    type: "Charter Elementary and Middle/High School",
    description: "Comprehensive K-12 charter school serving Skye Canyon families"
  }
];

const schoolsFAQs = [
  {
    question: "What elementary schools serve Skye Canyon?",
    answer: "Skye Canyon is served by three excellent K-5 elementary schools: William & Mary Scherkenbach Elementary, James Bilbray Elementary, and Kenneth Divich Elementary, all part of Clark County School District."
  },
  {
    question: "Which middle schools do Skye Canyon students attend?",
    answer: "Skye Canyon students attend Ralph Cadwallader Middle School or Edmundo Escobedo Sr Middle School, both highly-rated Clark County School District middle schools."
  },
  {
    question: "What is the zoned high school for Skye Canyon?",
    answer: "Arbor View High School is the zoned high school for Skye Canyon residents, known for excellent academics and athletics programs."
  },
  {
    question: "Are there charter school options in Skye Canyon?",
    answer: "Yes, Somerset Academy – Skye Canyon Campus offers K-12 charter education with smaller class sizes and specialized programs for Skye Canyon families."
  },
  {
    question: "Will Skye Canyon get its own schools?",
    answer: "Future development plans include a K-5 elementary, middle school, and high school within Skye Canyon, subject to Clark County School District funding and approval."
  },
  {
    question: "How do I find current school zoning for my Skye Canyon address?",
    answer: "Visit Clark County School District's website for elementary, middle, and high school zoning maps, or contact Dr. Jan Duffy for assistance with school information for specific properties."
  }
];

export default function SkyeCanyonSchools() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon Schools | Top-Rated Elementary, Middle & High Schools | Las Vegas NV</title>
        <meta name="description" content="Discover excellent public and charter schools serving Skye Canyon families. Find information on K-5 elementary, middle schools, and Arbor View High School in Las Vegas Nevada." />
        <meta name="keywords" content="Skye Canyon schools, Las Vegas schools, Nevada schools, Arbor View High School, Somerset Academy, Clark County School District, elementary schools Las Vegas" />
        
        {/* GEO/AI Optimization Meta Tags */}
        <meta name="geo.placename" content="Skye Canyon, Las Vegas, Nevada" />
        <meta name="geo.region" content="US-NV" />
        <meta name="ICBM" content="36.2887, -115.3366" />
        
        {/* Voice Search Optimization */}
        <meta name="speakable" content="Skye Canyon is served by excellent Clark County School District schools including Arbor View High School" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Skye Canyon Schools | Top-Rated Education Options | Las Vegas Nevada" />
        <meta property="og:description" content="Complete guide to public and charter schools serving Skye Canyon families in Las Vegas, Nevada." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://skyecanyonhomesforsale.com/skye-canyon-schools" />
        
        <link rel="canonical" href="https://skyecanyonhomesforsale.com/skye-canyon-schools" />
      </Helmet>

      {/* Enhanced Structured Data for Schools */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Skye Canyon Schools Guide - Top-Rated Education Options",
          "description": "Comprehensive guide to public and charter schools serving Skye Canyon, Las Vegas families",
          "author": {
            "@type": "Person",
            "name": "Dr. Jan Duffy",
            "jobTitle": "REALTOR®",
            "license": "S.0197614"
          },
          "publisher": {
            "@type": "RealEstateAgent",
            "name": "Dr. Jan Duffy",
            "license": "S.0197614"
          },
          "datePublished": "2025-06-01",
          "dateModified": "2025-06-01",
          "about": {
            "@type": "Place",
            "name": "Skye Canyon",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Las Vegas",
              "addressRegion": "Nevada",
              "postalCode": "89166"
            }
          },
          "mentions": [
            {
              "@type": "School",
              "name": "Arbor View High School",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Las Vegas",
                "addressRegion": "Nevada"
              }
            },
            {
              "@type": "School", 
              "name": "Somerset Academy Skye Canyon Campus",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Las Vegas",
                "addressRegion": "Nevada"
              }
            }
          ]
        })}
      </script>

      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Skye Canyon Schools
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Exceptional education options for Skye Canyon families. Choose from excellent 
                public schools in Clark County School District or specialized charter programs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <School className="w-4 h-4 mr-2 text-blue-600" />
                  <span>9 Public Schools</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Charter Options</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Top-Rated Programs</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Elementary Schools Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                K-5 Elementary Schools
              </h2>
              <p className="text-xl text-gray-600">
                Three excellent elementary schools serve Skye Canyon families
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {elementarySchools.map((school, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-blue-600">Elementary</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {school.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{school.type}</p>
                  <p className="text-sm text-gray-500">{school.district}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Middle Schools Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Middle/Junior High Schools
              </h2>
              <p className="text-xl text-gray-600">
                Quality middle school education preparing students for high school success
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {middleSchools.map((school, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-green-600">Middle School</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {school.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{school.type}</p>
                  <p className="text-sm text-gray-500">{school.district}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* High School Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Senior High School
              </h2>
              <p className="text-xl text-gray-600">
                Arbor View High School - Skye Canyon's premier high school destination
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 text-center">
                <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Arbor View High School
                </h3>
                <p className="text-gray-600 mb-4">
                  Clark County School District's flagship high school serving Skye Canyon, 
                  known for excellent academics, athletics, and college preparation programs.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">Academic Excellence</div>
                    <div className="text-gray-600">Advanced Placement courses</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">Athletics</div>
                    <div className="text-gray-600">Championship programs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charter School Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Charter School Options
              </h2>
              <p className="text-xl text-gray-600">
                Alternative education with specialized programs and smaller class sizes
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-orange-600 mr-3" />
                  <span className="text-sm font-medium text-orange-600">Charter School</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Somerset Academy – Skye Canyon Campus
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive K-12 charter school offering personalized education with 
                  smaller class sizes and innovative teaching methods for Skye Canyon families.
                </p>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Charter Advantages:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Smaller class sizes for personalized attention</li>
                    <li>• Innovative curriculum and teaching methods</li>
                    <li>• K-12 continuity in one campus location</li>
                    <li>• Specialized programs and extracurricular activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Future Schools Section */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Future School Development
              </h2>
              <p className="text-xl text-gray-600">
                Planned educational facilities to serve growing Skye Canyon community
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-blue-600">Future Development</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">K-5 Elementary</h3>
                  <p className="text-sm text-gray-600">New elementary school planned within Skye Canyon</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Middle School</h3>
                  <p className="text-sm text-gray-600">Junior high school for community students</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">High School</h3>
                  <p className="text-sm text-gray-600">Comprehensive high school within community</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> School openings are subject to change and dependent on 
                  Clark County School District funding and enrollment projections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* School Zoning Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                School Zoning Information
              </h2>
              <p className="text-xl text-gray-600">
                Find current school assignments for your Skye Canyon address
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Elementary School Zoning</h3>
                  <p className="text-sm text-gray-600 mb-4">Find your zoned K-5 elementary school</p>
                  <a href="https://ccsd.net/schools/zoning" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-700 font-medium">
                    Check Elementary Zones →
                  </a>
                </div>
                
                <div>
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Middle School Zoning</h3>
                  <p className="text-sm text-gray-600 mb-4">Find your zoned middle school</p>
                  <a href="https://ccsd.net/schools/zoning" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-green-600 hover:text-green-700 font-medium">
                    Check Middle School Zones →
                  </a>
                </div>
                
                <div>
                  <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">High School Zoning</h3>
                  <p className="text-sm text-gray-600 mb-4">Confirm your high school assignment</p>
                  <a href="https://ccsd.net/schools/zoning" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-purple-600 hover:text-purple-700 font-medium">
                    Check High School Zones →
                  </a>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Need help finding school information for a specific property? 
                  <a href="tel:+17025001902" className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                    Contact Dr. Jan Duffy at (702) 500-1902
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection 
          title="Skye Canyon Schools - Frequently Asked Questions"
          faqs={schoolsFAQs}
          pageType="skye-canyon"
        />

        <Footer />
      </div>
    </>
  );
}