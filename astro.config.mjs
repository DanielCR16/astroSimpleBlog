// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  site:`https://astrostaticblog.netlify.app`,
   vite: {
    plugins: [tailwindcss()],
  },

});