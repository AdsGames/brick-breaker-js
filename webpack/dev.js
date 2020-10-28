const { merge } = require("webpack-merge");
const path = require("path");

const base = require("./base");

module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    writeToDisk: true,
    open: true,
  },
});
