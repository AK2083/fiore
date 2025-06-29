// Deklariere window.env, damit TypeScript es kennt
declare global {
  interface Window {
    env: {
      supabaseUrl: string;
      supabaseKey: string;
      loggingLevel?: string;
      production?: string;
    };
  }
}

export const environment = {
  production: false, // 'true'/'false' aus envsubst wird zu boolean
  supabaseUrl: window.env?.supabaseUrl || 'http://localhost:54321', // Fallback für Entwicklung
  supabaseKey: window.env?.supabaseKey || 'your-dev-anon-key', // Fallback für Entwicklung
  logging: 'debug'
};