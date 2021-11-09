const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    
  ],
};
module.exports = {
    // Other rules...
    plugins: [
        new NodePolyfillPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "addon", to: "." },
            ],
          }),
    ]
}