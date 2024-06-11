// root directory webpack.config.js
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      languages: ["csharp"], // Adicione outras linguagens conforme necessário
    }),
  ],
  resolve: {
    alias: {
      monaco: path.resolve("./node_modules/monaco-editor"),
    },
  },
};
