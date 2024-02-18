// vite.config.js
import { defineConfig } from "file:///C:/Users/lucas/Desktop/Empreguei/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/lucas/Desktop/Empreguei/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  vite: {
    define: {
      "process.env": process.env
    }
  },
  // ReactStrictMode:false,
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {fs: false}
  //   return config
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  }
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5001',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //       configure: (proxy, _options) => {
  //         proxy.on('error', (err, _req, _res) => {
  //           console.log('proxy error', err);
  //         });
  //         proxy.on('proxyReq', (proxyReq, req, _res) => {
  //           console.log('Sending Request to the Target:', req.method, req.url);
  //         });
  //         proxy.on('proxyRes', (proxyRes, req, _res) => {
  //           console.log(
  //             'Received Response from the Target:',
  //             proxyRes.statusCode,
  //             req.url
  //           );
  //         });
  //       },
  //     },
  //   },
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsdWNhc1xcXFxEZXNrdG9wXFxcXEVtcHJlZ3VlaVxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGx1Y2FzXFxcXERlc2t0b3BcXFxcRW1wcmVndWVpXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbHVjYXMvRGVza3RvcC9FbXByZWd1ZWkvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgdml0ZToge1xyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICdwcm9jZXNzLmVudic6IHByb2Nlc3MuZW52LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIFJlYWN0U3RyaWN0TW9kZTpmYWxzZSxcclxuICAvLyB3ZWJwYWNrNTogdHJ1ZSxcclxuICAvLyB3ZWJwYWNrOiAoY29uZmlnKSA9PiB7XHJcbiAgLy8gICBjb25maWcucmVzb2x2ZS5mYWxsYmFjayA9IHtmczogZmFsc2V9XHJcbiAgLy8gICByZXR1cm4gY29uZmlnXHJcbiAgLy8gfSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkXHJcbiAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXVxyXG4gICAgICAgICAgICAgIC5zcGxpdCgnLycpWzBdXHJcbiAgICAgICAgICAgICAgLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICAvLyBzZXJ2ZXI6IHtcclxuICAvLyAgIHByb3h5OiB7XHJcbiAgLy8gICAgICcvYXBpJzoge1xyXG4gIC8vICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMScsXHJcbiAgLy8gICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gIC8vICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgLy8gICAgICAgd3M6IHRydWUsXHJcbiAgLy8gICAgICAgY29uZmlndXJlOiAocHJveHksIF9vcHRpb25zKSA9PiB7XHJcbiAgLy8gICAgICAgICBwcm94eS5vbignZXJyb3InLCAoZXJyLCBfcmVxLCBfcmVzKSA9PiB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdwcm94eSBlcnJvcicsIGVycik7XHJcbiAgLy8gICAgICAgICB9KTtcclxuICAvLyAgICAgICAgIHByb3h5Lm9uKCdwcm94eVJlcScsIChwcm94eVJlcSwgcmVxLCBfcmVzKSA9PiB7XHJcbiAgLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdTZW5kaW5nIFJlcXVlc3QgdG8gdGhlIFRhcmdldDonLCByZXEubWV0aG9kLCByZXEudXJsKTtcclxuICAvLyAgICAgICAgIH0pO1xyXG4gIC8vICAgICAgICAgcHJveHkub24oJ3Byb3h5UmVzJywgKHByb3h5UmVzLCByZXEsIF9yZXMpID0+IHtcclxuICAvLyAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgLy8gICAgICAgICAgICAgJ1JlY2VpdmVkIFJlc3BvbnNlIGZyb20gdGhlIFRhcmdldDonLFxyXG4gIC8vICAgICAgICAgICAgIHByb3h5UmVzLnN0YXR1c0NvZGUsXHJcbiAgLy8gICAgICAgICAgICAgcmVxLnVybFxyXG4gIC8vICAgICAgICAgICApO1xyXG4gIC8vICAgICAgICAgfSk7XHJcbiAgLy8gICAgICAgfSxcclxuICAvLyAgICAgfSxcclxuICAvLyAgIH0sXHJcbiAgLy8gfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsU0FBUyxvQkFBb0I7QUFDaFYsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixNQUFNO0FBQUEsSUFDSixRQUFRO0FBQUEsTUFDTixlQUFlLFFBQVE7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixtQkFBTyxHQUNKLFNBQVMsRUFDVCxNQUFNLGVBQWUsRUFBRSxDQUFDLEVBQ3hCLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFDWixTQUFTO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQTBCRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
