import { Mountain, Globe, Shield, Home, MapPin, Users } from "@/lib/icons";

const highlights = [
  {
    icon: Mountain,
    title: "Stunning Views",
    description: "Panoramic mountain and city views from every home, creating breathtaking backdrops for daily living."
  },
  {
    icon: Globe,
    title: "Golf Course Living",
    description: "Championship golf course designed by renowned architects, offering world-class amenities and recreation."
  },
  {
    icon: Shield,
    title: "Gated Security",
    description: "24/7 gated community with professional security ensuring privacy and peace of mind for residents."
  },
  {
    icon: Home,
    title: "Custom Homes",
    description: "Luxury custom-built homes with premium finishes, smart home technology, and architectural excellence."
  },
  {
    icon: MapPin,
    title: "Prime Location",
    description: "Convenient access to Las Vegas Strip, shopping, dining, and entertainment while maintaining suburban tranquility."
  },
  {
    icon: Users,
    title: "Community",
    description: "Vibrant community with clubhouse, fitness center, pools, and organized events for residents."
  }
];

export default function CommunityHighlights() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Skye Canyon?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes Skye Canyon Las Vegas's premier luxury community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div key={index} className="text-center p-6">
                <div className="bg-realscout-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-realscout-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
