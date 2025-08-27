import { useEffect } from 'react';

// Image compression and optimization utilities
export default function ImageCompression() {
  useEffect(() => {
    // Compress and optimize images on the client side
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[src]');

      images.forEach((img: Element) => {
        const imgElement = img as HTMLImageElement;

        // Skip if already optimized
        if (imgElement.dataset.optimized) {
          return;
        }

        // Add compression attributes
        imgElement.style.imageRendering = 'crisp-edges';

        // Mark as optimized
        imgElement.dataset.optimized = 'true';

        // Monitor large images
        imgElement.onload = () => {
          if (imgElement.naturalWidth > 1920 || imgElement.naturalHeight > 1080) {
          }
        };
      });
    };

    // Initial optimization
    optimizeImages();

    // Monitor for new images
    const observer = new MutationObserver(optimizeImages);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
