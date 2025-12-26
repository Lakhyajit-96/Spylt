import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true
    }), 
    tailwindcss()
  ],
  
  // Build optimizations
  build: {
    // Target modern browsers for better performance
    target: 'es2015',
    
    // Enable minification
    minify: 'terser',
    
    // Terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'gsap-vendor': ['gsap', '@gsap/react']
        },
        
        // Asset naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i.test(assetInfo.name)) {
            return `assets/media/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].${ext}`;
        }
      }
    },
    
    // Source maps for production debugging
    sourcemap: false,
    
    // Asset size warnings
    chunkSizeWarningLimit: 1000,
    
    // CSS code splitting
    cssCodeSplit: true
  },
  
  // Development server optimizations
  server: {
    // Enable HTTP/2
    https: false,
    
    // Faster HMR
    hmr: {
      overlay: true
    }
  },
  
  // Preview server optimizations
  preview: {
    port: 4173
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'gsap',
      '@gsap/react',
      'react-responsive'
    ]
  },
  
  // Asset handling
  assetsInclude: ['**/*.webp', '**/*.mp4', '**/*.webm'],
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  }
});
