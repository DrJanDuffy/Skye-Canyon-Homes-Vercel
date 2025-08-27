import { ExternalLink, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const recentReviews = [
  {
    name: 'Michael & Sarah C.',
    rating: 5,
    text: 'Dr. Duffy made our dream of living in Skye Canyon a reality. Her expertise in the luxury market was invaluable.',
    date: '2024-11-15',
  },
  {
    name: 'Jennifer M.',
    rating: 5,
    text: 'Outstanding service from start to finish. Dr. Duffy truly understands the luxury market.',
    date: '2024-10-28',
  },
  {
    name: 'Robert & Lisa T.',
    rating: 5,
    text: "Sold our home above asking price in just 3 days! Dr. Duffy's marketing strategy was spot on.",
    date: '2024-09-12',
  },
];

export default function ReviewHighlights() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">98% Client Satisfaction Rate</h2>
          <p className="text-xl text-gray-600 mb-8">
            Over 150 five-star reviews from satisfied Skye Canyon clients
          </p>
          <a href="https://g.co/kgs/nbUf6Pj" target="_blank" rel="noopener noreferrer">
            <Button className="bg-realscout-blue hover:bg-realscout-navy text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              Read All Reviews
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentReviews.map((review, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-realscout-blue mb-3" />
                <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                <div className="text-sm text-gray-500">
                  <p className="font-semibold">{review.name}</p>
                  <p>{new Date(review.date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
