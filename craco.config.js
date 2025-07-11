const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./src",
        aliases: {
          "@components": "./components",
          "@layouts": "./layouts",
          "@pages": "./pages",
          "@styles": "./styles",
          "@assets": "./assets"
        }
      }
    }
  ]
};
