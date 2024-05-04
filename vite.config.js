import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(), // Assuming you're using React
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss('./tailwind.config.js'),
        // Optionally, you can add other PostCSS plugins here
      ],
    },
  },
});