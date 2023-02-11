const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: './src/Client/UI/css/turtle.css',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
   minimize:true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
   new MiniCssExtractPlugin(),
  ],
};