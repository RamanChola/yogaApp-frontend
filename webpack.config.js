const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// This configuration file does the following:

// Specifies the entry point for the application as ./src/index.js
// Sets the mode to development to enable development-specific optimizations
// Uses the babel-loader to transpile JavaScript code with the @babel/env preset
// Loads CSS files with the style-loader and css-loader
// Resolves file extensions in the order of .js, .jsx
// Outputs the bundled JavaScript to the dist directory with the filename bundle.js
// Configures the development server to serve the application from the public directory on port 3000 and enables hot reloading with the HotModuleReplacementPlugin
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public/"),
    },
    port: 3000,
    // automatic refresh on change
    hot: "only",
    // for react router dom
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve("./public/index.html"),
    }),
  ],
};
