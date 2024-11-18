import { EnvironmentPlugin } from 'webpack';
const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv(),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};