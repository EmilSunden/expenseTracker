import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
export default defineConfig({
  plugins: [
    tailwindcss(),
    nodePolyfills({
      include: ['stream', 'buffer', 'crypto', 'path', 'fs', 'os', 'url'],
      exclude: ['electron']
    })
  ],
  build: {
    target: 'node23',
    rollupOptions: {
      external: ['electron', 'path'],
    },
    outDir: 'dist',
  }
})