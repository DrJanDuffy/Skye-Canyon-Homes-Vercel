import { useEffect } from "react";

interface RealScoutSearchProps {
  type: "simple" | "advanced";
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'realscout-simple-search': any;
      'realscout-advanced-search': any;
    }
  }
}

export default function RealScoutSearch({ type, className = "" }: RealScoutSearchProps) {
  useEffect(() => {
    // Ensure the web components are loaded
    if (typeof window !== 'undefined' && !customElements.get('realscout-simple-search')) {
      console.log('RealScout components not yet loaded');
    }
  }, []);

  if (type === "simple") {
    return (
      <div className={className}>
        <realscout-simple-search
          agent-id="QWdlbnQtMjI1MDUw"
          domain="drjanduffy.realscout.com"
          widget-id="search-widget"
        ></realscout-simple-search>
      </div>
    );
  }

  return (
    <div className={className}>
      <realscout-advanced-search
        agent-id="QWdlbnQtMjI1MDUw"
        domain="drjanduffy.realscout.com"
        widget-id="advanced-search-widget"
      ></realscout-advanced-search>
    </div>
  );
}