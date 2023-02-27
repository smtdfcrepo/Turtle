const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
console.log(path.join(__dirname, "./../../../UI/css/turtle.css"))
module.exports = {
	entry: path.join(__dirname, "./../../../UI/css/turtle.css"),
	mode: "production",
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
		minimize: true,
		minimizer: [
      new CssMinimizerPlugin(),
    ],
	},
	plugins: [
   new MiniCssExtractPlugin(),
  ],
};