import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 1. Critical: Tell Vite your site is at the root of the domain
  base: '/', 
  
  // 2. Keep your 3D model support
  assetsInclude: ['**/*.glb'], 

  build: {
    // 3. This helps with the 'its-fine' error by organizing the code better
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // 4. Increase the limit so 3D libraries don't trigger warnings
    chunkSizeWarningLimit: 2000, 
  },
});