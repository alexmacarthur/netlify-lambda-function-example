const webpack = require('webpack');
const fs = require("fs");
const toml = require('toml');
const config = toml.parse(fs.readFileSync('./netlify.toml'));

const LAMBDA_ENDPOINT = process.env.LAMBDA_ENDPOINT !== undefined
  ? process.env.LAMBDA_ENDPOINT
  : config.context.base.environment.LAMBDA_ENDPOINT;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY !== undefined
  ? process.env.STRIPE_PUBLISHABLE_KEY
  : config.context.base.environment.STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY !== undefined
  ? process.env.STRIPE_SECRET_KEY
  : config.context.base.environment.STRIPE_SECRET_KEY;

module.exports = {
  entry: './src/scripts.js',
  output: {
    path: __dirname + '/src',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      LAMBDA_ENDPOINT: JSON.stringify(LAMBDA_ENDPOINT),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(STRIPE_PUBLISHABLE_KEY),
      STRIPE_SECRET_KEY: JSON.stringify(STRIPE_SECRET_KEY)
    })
  ]
}
