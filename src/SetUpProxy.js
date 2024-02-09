const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Specify the API route you want to proxy (adjust as needed)
    createProxyMiddleware({
      target: 'https://order-api-patiparnpa.vercel.app', // Replace with your API server's URL
      changeOrigin: true, // Needed for virtual hosted sites
      pathRewrite: {
        '^/api': '', // Remove the '/api' path prefix (adjust as needed)
      },
    })
  );
};