import { performanceConfig } from "@/lib/performance";

export default function PerformanceOptimizer() {
  return (
    <>
      {/* Preconnect to critical domains */}
      {performanceConfig.preconnect.map(url => (
        <link key={url} rel="preconnect" href={url} />
      ))}
      
      {/* DNS prefetch */}
      {performanceConfig.resourceHints.dns.map(url => (
        <link key={url} rel="dns-prefetch" href={url} />
      ))}
      
      {/* Preconnect for fonts */}
      {performanceConfig.resourceHints.preconnect.map(url => (
        <link key={url} rel="preconnect" href={url} crossOrigin="anonymous" />
      ))}
      
      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Prefetch API endpoints */}
      {performanceConfig.resourceHints.prefetch.map(url => (
        <link key={url} rel="prefetch" href={url} />
      ))}
    </>
  );
}