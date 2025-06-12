import { Helmet } from "react-helmet-async";

export default function HomeSimple() {
  return (
    <>
      <Helmet>
        <title>Skye Canyon | Dr. Jan Duffy, REALTOR®</title>
        <meta name="description" content="Skye Canyon Las Vegas Luxury Homes | Dr. Jan Duffy, REALTOR®. Expert market knowledge, personalized service, and exclusive listings in North Las Vegas." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Dr. Jan Duffy, REALTOR®</h1>
          <p className="text-blue-100">Skye Canyon Real Estate Specialist</p>
        </header>
        
        <main className="container mx-auto p-6">
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Welcome to Skye Canyon Homes</h2>
            <p className="text-lg text-gray-600 mb-6">
              Find your dream home in one of Las Vegas's most desirable communities. 
              With expert local knowledge and personalized service, I'll help you navigate 
              the Skye Canyon real estate market.
            </p>
          </section>
          
          <section className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Property Search</h3>
              <p className="text-gray-600 mb-4">
                Browse available homes in Skye Canyon with detailed property information.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Properties
              </button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Market Analysis</h3>
              <p className="text-gray-600 mb-4">
                Get current market insights and home valuations for Skye Canyon.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Market Reports
              </button>
            </div>
          </section>
          
          <section className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Contact Dr. Jan Duffy</h3>
            <p className="text-gray-700 mb-4">
              Ready to buy or sell in Skye Canyon? Let's discuss your real estate goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <span className="text-blue-600 font-semibold">(702) 500-1902</span>
              <span className="text-blue-600">jan@skyecanyonhomes.com</span>
            </div>
          </section>
        </main>
        
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 Dr. Jan Duffy, REALTOR® | Skye Canyon Real Estate</p>
          </div>
        </footer>
      </div>
    </>
  );
}