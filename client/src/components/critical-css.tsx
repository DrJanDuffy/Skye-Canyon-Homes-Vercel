export default function CriticalCSS() {
  const criticalStyles = `
    /* Critical Above-the-fold CSS */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #ffffff;
    }
    
    /* Navigation Critical Styles */
    .nav-header {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      height: 72px;
    }
    
    .nav-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
    
    /* Hero Section Critical Styles */
    .hero-section {
      min-height: 600px;
      background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    
    .hero-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
      position: relative;
      z-index: 2;
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
      max-width: 600px;
    }
    
    /* Button Critical Styles */
    .btn-primary {
      background-color: #ffffff;
      color: #1e40af;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }
    
    .btn-primary:hover {
      background-color: #f8fafc;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    /* Image Optimization */
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    
    /* Typography Optimization */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 0.5rem;
    }
    
    /* Layout Optimization */
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .section {
      padding: 4rem 0;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.125rem;
      }
      
      .nav-container {
        padding: 0 0.75rem;
      }
      
      .section {
        padding: 2rem 0;
      }
    }
    
    /* Performance Optimizations */
    .lazyload {
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .lazyloaded {
      opacity: 1;
    }
    
    /* Prevent layout shift */
    .aspect-ratio-16-9 {
      aspect-ratio: 16 / 9;
    }
    
    .aspect-ratio-4-3 {
      aspect-ratio: 4 / 3;
    }
    
    /* Loading states */
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  return (
    <style 
      dangerouslySetInnerHTML={{ __html: criticalStyles }}
      data-purpose="critical-css"
    />
  );
}