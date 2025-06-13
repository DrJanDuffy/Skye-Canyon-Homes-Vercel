declare namespace JSX {
  interface IntrinsicElements {
    'realscout-office-listings': {
      'agent-encoded-id'?: string;
      'price-min'?: string;
      'price-max'?: string;
      style?: React.CSSProperties;
      children?: React.ReactNode;
    };
  }
}

declare global {
  interface Window {
    customElements: CustomElementRegistry;
  }
}