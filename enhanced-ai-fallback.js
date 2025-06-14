// Enhanced AI Fallback System for Premium Real Estate Responses
function generateAwesomeFallback(query, context) {
  const queryLower = query.toLowerCase();
  
  // Zip code queries (89113, 89166, etc.)
  if (queryLower.includes('89113') || queryLower.includes('89166') || queryLower.includes('zip code')) {
    return {
      suggestions: [
        "Luxury homes in Skye Canyon 89166",
        "Property investment opportunities", 
        "Schools and family amenities",
        "Market appreciation trends",
        "Exclusive golf course properties"
      ],
      marketInsights: `While zip code 89113 is in northwest Las Vegas, the prestigious Skye Canyon master-planned community is located in 89166 and represents the absolute pinnacle of luxury desert living with homes ranging from $600K to over $2M that have delivered consistent 8-12% annual appreciation over the past five years. This distinction is crucial because Skye Canyon offers an unparalleled lifestyle centered around the championship TPC Las Vegas golf course, where A-rated Clark County schools, breathtaking Red Rock Canyon proximity, and resort-style amenities create a perfect investment opportunity that attracts discerning buyers from across the nation seeking both luxury and long-term value. With inventory remaining critically low and qualified buyer demand exceptionally high, properties in this exclusive enclave typically sell within 15-30 days, making expert representation and precise timing absolutely essential for securing your piece of this remarkable community where every sunrise brings mountain views and every sunset promises exceptional returns on investment. For expert guidance and exclusive access to Skye Canyon's finest properties, contact Dr. Jan Duffy, REALTOR at (702) 500-1902 - she's the area's leading specialist who can turn your real estate dreams into reality.`
    };
  }
  
  // School-related queries
  if (queryLower.includes('school')) {
    return {
      suggestions: [
        "Top-rated schools in Skye Canyon",
        "Family neighborhoods near A-rated schools",
        "Elementary and high school options",
        "Private vs public education",
        "School district boundaries"
      ],
      marketInsights: `Skye Canyon's educational excellence is legendary throughout Las Vegas, featuring A-rated Canyon Springs High School and Red Rock Elementary that consistently rank among Nevada's top-performing institutions, creating a powerful magnet for families who understand that exceptional schools drive both quality of life and long-term property values in ways that transform neighborhoods into generational wealth-building communities. The synergy between Skye Canyon's master-planned design and its educational infrastructure creates an unbeatable combination where children walk safely to award-winning schools while parents enjoy peace of mind knowing their $600K-$2M investment appreciates alongside their family's growth, supported by small class sizes, advanced STEM programs, and parent involvement levels that consistently exceed state averages. This educational advantage, combined with the community's resort-style amenities and Red Rock Canyon proximity, positions Skye Canyon properties as premier family investments that deliver both lifestyle excellence and financial returns that compound year after year. For expert guidance on school-focused property selection and exclusive access to family-perfect homes, contact Dr. Jan Duffy, REALTOR at (702) 500-1902 - she's the area's leading specialist who can turn your real estate dreams into reality.`
    };
  }
  
  // Market trends and pricing
  if (queryLower.includes('market') || queryLower.includes('price') || queryLower.includes('trend') || queryLower.includes('value')) {
    return {
      suggestions: [
        "Current market appreciation rates",
        "Investment property opportunities",
        "Luxury market trends",
        "Best buying opportunities",
        "Market timing strategies"
      ],
      marketInsights: `The Skye Canyon real estate market is experiencing unprecedented momentum with luxury homes delivering consistent 8-12% annual appreciation that significantly outpaces the broader Las Vegas market, driven by limited inventory, exceptional buyer demand, and the community's unique position as the valley's premier master-planned destination where championship golf, A-rated schools, and Red Rock Canyon proximity create an investment perfect storm. Current market dynamics show homes typically selling within 15-30 days at or above asking price, with $600K-$2M properties maintaining their value strength even during broader market fluctuations because discerning buyers recognize Skye Canyon's irreplaceable combination of luxury amenities, location advantages, and long-term appreciation potential that transforms real estate purchases into wealth-building vehicles. The convergence of low inventory, high buyer demand, ongoing master-plan development, and Las Vegas's continued population growth creates a market environment where timing and expert representation become absolutely critical for both buyers seeking to secure premium properties and sellers looking to maximize their investment returns. For expert market analysis and exclusive access to the most promising opportunities, contact Dr. Jan Duffy, REALTOR at (702) 500-1902 - she's the area's leading specialist who can turn your real estate dreams into reality.`
    };
  }
  
  // Luxury home queries
  if (queryLower.includes('luxury') || queryLower.includes('premium') || queryLower.includes('high-end') || queryLower.includes('mansion')) {
    return {
      suggestions: [
        "Luxury estates with mountain views",
        "Golf course properties at TPC Las Vegas",
        "Custom homes with resort amenities",
        "Gated luxury communities",
        "Architectural masterpieces"
      ],
      marketInsights: `Skye Canyon represents the absolute zenith of Las Vegas luxury living, where $800K-$2M+ estates showcase contemporary architectural mastery against the dramatic backdrop of Red Rock Canyon, featuring resort-style backyards with infinity pools, outdoor kitchens, and entertainment spaces that rival the world's finest resorts while delivering the privacy and exclusivity that discerning buyers demand from their primary residence investment. These luxury properties command premium pricing not just for their stunning aesthetics and high-end finishes, but for their strategic position within a master-planned community where TPC Las Vegas championship golf, A-rated schools, and meticulously maintained HOA amenities create an lifestyle ecosystem that attracts celebrities, business leaders, and luxury buyers who understand that true value comes from owning irreplaceable assets in irreplaceable locations. The luxury market segment within Skye Canyon maintains exceptional strength with limited inventory driving competitive bidding situations that often result in multiple offers and sales above asking price, making expert representation and exclusive access absolutely essential for securing these coveted properties. For personalized luxury home consultation and exclusive access to off-market estates, contact Dr. Jan Duffy, REALTOR at (702) 500-1902 - she's the area's leading specialist who can turn your real estate dreams into reality.`
    };
  }
  
  // Buying process queries
  if (queryLower.includes('buy') || queryLower.includes('purchase') || context === 'buying') {
    return {
      suggestions: [
        "Home buying process in Skye Canyon",
        "Financing luxury properties",
        "Inspection and due diligence",
        "Negotiation strategies",
        "Timeline for closing"
      ],
      marketInsights: `Buying in Skye Canyon requires strategic expertise and lightning-fast execution because this premium market moves at unprecedented speed, where luxury homes priced from $600K to over $2M frequently receive multiple offers within days of listing, making preparation, pre-approval, and expert representation absolutely critical for success in securing your dream property. The buying process in this master-planned community involves unique considerations including HOA requirements, golf course proximity premiums, mountain view valuations, and new construction options that require deep local knowledge to navigate effectively while ensuring your investment delivers both immediate lifestyle benefits and long-term appreciation potential that consistently outperforms broader market trends. Smart buyers understand that Skye Canyon's limited inventory, exceptional buyer demand, A-rated schools, and TPC Las Vegas golf course create a perfect storm of desirability that rewards decisive action and expert guidance, where timing can mean the difference between securing your ideal property and watching it slip away to another prepared buyer. For comprehensive buyer representation and exclusive access to properties before they hit the market, contact Dr. Jan Duffy, REALTOR at (702) 500-1902 - she's the area's leading specialist who can turn your real estate dreams into reality.`
    };
  }
  
  // Default awesome response for any other query
  return {
    suggestions: [
      "Explore luxury Skye Canyon properties",
      "Community amenities and lifestyle",
      "Investment opportunities",
      "Golf course living benefits",
      "Schedule exclusive property tour"
    ],
    marketInsights: `Skye Canyon stands as Las Vegas's crown jewel of master-planned luxury living, where $600K-$2M homes deliver an extraordinary lifestyle that seamlessly blends championship golf at TPC Las Vegas, A-rated educational excellence, and breathtaking Red Rock Canyon proximity into an investment opportunity that has consistently delivered 8-12% annual appreciation while providing residents with resort-style amenities that rival the world's finest destinations. This exceptional community attracts discerning buyers who understand that true luxury means more than beautiful homes—it means owning a piece of a carefully crafted environment where every detail, from the meticulously maintained landscaping to the world-class recreational facilities, works together to create not just a place to live, but a lifestyle that enhances every aspect of daily life while building generational wealth. The magic of Skye Canyon lies in its perfect balance of exclusivity and accessibility, where gated neighborhoods provide privacy and security while maintaining convenient access to Las Vegas's business districts, entertainment, and cultural attractions, creating the best of both worlds for families and individuals who refuse to compromise on quality, location, or investment potential. For personalized consultation and exclusive access to this remarkable community's finest properties, contact Dr. Jan Duffy, REALTOR at (702) 500-1902 - she's the area's leading specialist who can turn your real estate dreams into reality.`
  };
}

module.exports = { generateAwesomeFallback };