import { useEffect } from 'react';

interface SchemaInjectorProps {
  schemas: any[];
}

export default function SchemaInjector({ schemas }: SchemaInjectorProps) {
  useEffect(() => {
    // Remove existing schema scripts to prevent duplicates
    const existingSchemas = document.querySelectorAll(
      'script[type="application/ld+json"][data-schema="custom"]'
    );
    existingSchemas.forEach((script) => script.remove());

    // Inject new schema scripts
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', 'custom');
      script.textContent = JSON.stringify(schema, null, 0);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      const schemasToRemove = document.querySelectorAll(
        'script[type="application/ld+json"][data-schema="custom"]'
      );
      schemasToRemove.forEach((script) => script.remove());
    };
  }, [schemas]);

  return null;
}
