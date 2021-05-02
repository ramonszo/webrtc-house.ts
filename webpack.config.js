const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  entry: ["./src/lib/index.ts"],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: `${path.resolve(__dirname)}/dist`,
    publicPath: "/",
    filename: "scripts/app.js",
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "index.react.html",
      template: "src/index.react.html",
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    liveReload: true,
    port: 3000,
    historyApiFallback: true,
    writeToDisk: true,
  },
};
