import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  integrations: [react()],
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});
