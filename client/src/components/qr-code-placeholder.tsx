import { QrCode } from 'lucide-react';

interface QRCodePlaceholderProps {
  reviewLink: string;
  className?: string;
}

export default function QRCodePlaceholder({ reviewLink, className = '' }: QRCodePlaceholderProps): JSX.Element {
  return (
    <div className={`bg-white p-6 rounded-lg border-2 border-dashed border-gray-300 text-center ${className}`}>
      {/* Replace this placeholder with your actual QR code image */}
      <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
        <QrCode className="w-16 h-16 text-gray-400" />
      </div>
      
      {/* Instructions for getting the real QR code */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium">
          QR Code for Google Review
        </p>
        <p className="text-xs text-gray-400">
          To get your actual QR code:
        </p>
        <ol className="text-xs text-gray-400 text-left max-w-xs mx-auto space-y-1">
          <li>1. Go to your Google Business Profile</li>
          <li>2. Navigate to Reviews section</li>
          <li>3. Click "Share your reviews QR code"</li>
          <li>4. Right-click and save the image</li>
          <li>5. Replace this placeholder component</li>
        </ol>
      </div>
      
      {/* Review link display */}
      <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-600 break-all">
        {reviewLink}
      </div>
      
      <p className="text-xs text-gray-400 mt-2">
        Scan me to leave a review!
      </p>
    </div>
  );
}
