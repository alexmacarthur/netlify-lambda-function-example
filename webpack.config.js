require("dotenv").config();

const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/front-end.js",
  output: {
    path: __dirname + "/src",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      LAMBDA_ENDPOINT: JSON.stringify(process.env.LAMBDA_ENDPOINT),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY)
    })
  ]
};
