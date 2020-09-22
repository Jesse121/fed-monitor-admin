const path = require("path");
function resolve(dir) {
  return path.resolve(__dirname, dir);
}
module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [
        path.resolve(__dirname, "src/styles/_variables.scss"),
        path.resolve(__dirname, "src/styles/_mixins.scss")
      ]
    }
  }
};
