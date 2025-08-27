import { useEffect, useRef, useState } from 'react';

export function useLazyLoading(threshold = 0.1, rootMargin = '50px') {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { isInView, elementRef };
}

export function useImagePreloader(imageSources: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    imageSources.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set(prev).add(src));
      };
      img.src = src;
    });
  }, [imageSources]);

  return loadedImages;
}
