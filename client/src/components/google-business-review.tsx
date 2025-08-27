import { ExternalLink, Star, MessageCircle, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QRCodePlaceholder from './qr-code-placeholder';

export default function GoogleBusinessReview(): JSX.Element {
  const reviewLink = 'https://g.page/r/CVaZ8MapUtFoEBM/review';
  
  const bestPractices = [
    'Ask satisfied clients to leave reviews after successful transactions',
    'Respond to all reviews, both positive and negative',
    'Use the review link in follow-up emails and thank you notes',
    'Display the QR code at your office and open houses',
    'Include review requests in your marketing materials'
  ];

  const negativeReviewTips = [
    'Respond professionally and promptly',
    'Address concerns constructively',
    'Offer solutions when possible',
    'Learn from feedback to improve service',
    'Maintain a positive, solution-focused approach'
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Help Us Build Trust in Skye Canyon
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Your reviews help our Business Profile stand out to customers on Google Search and Maps. 
            Businesses with 5+ reviews can get up to twice as many customers!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={reviewLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-realscout-blue hover:bg-realscout-navy text-white text-lg px-8 py-3">
                <ExternalLink className="w-5 h-5 mr-2" />
                Leave a Google Review
              </Button>
            </a>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              ⭐ 98% Client Satisfaction
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Review Link Section */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Share2 className="w-6 h-6 mr-2 text-realscout-blue" />
                Share Your Review Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Use this direct link to make it easy for clients to leave reviews:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <code className="text-sm break-all text-realscout-blue">
                  {reviewLink}
                </code>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={reviewLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Test Review Link
                  </Button>
                </a>
                <Button 
                  variant="outline" 
                  onClick={() => navigator.clipboard.writeText(reviewLink)}
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Section */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <span className="w-6 h-6 mr-2 text-realscout-blue">📱</span>
                QR Code for Easy Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Display this QR code at your office, open houses, and marketing materials for easy access:
              </p>
              <QRCodePlaceholder reviewLink={reviewLink} />
              <p className="text-sm text-gray-600">
                <strong>Tip:</strong> Print this QR code and place it in high-visibility areas where clients can easily scan it.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Best Practices Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Best Practices for Getting Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                Handling Negative Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {negativeReviewTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Help Us Build Trust?
            </h3>
            <p className="text-gray-600 mb-6">
              Your review helps other Skye Canyon families find their dream home with confidence.
            </p>
            <a href={reviewLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-realscout-blue hover:bg-realscout-navy text-white text-lg px-8 py-3">
                <Star className="w-5 h-5 mr-2" />
                Write a Google Review Now
              </Button>
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Takes less than 2 minutes • Helps other families • Builds community trust
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
