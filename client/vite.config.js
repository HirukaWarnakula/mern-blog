import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  plugins: [react(), nodePolyfills()],
})
