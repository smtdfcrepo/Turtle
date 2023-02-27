const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const dree = require('dree');
const options = {
	stat: false,
	extensions: ["js"]
};

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports.build = function (configs) {
	let webpackConfigs = []
	const fileCallback = function(element, stat) {
		console.log(`Processing files: ${element.relativePath}`)
		var extension = path.extname(element.relativePath);
		var file = path.basename(element.relativePath, extension);
		let base_dir = path.basename(path.dirname(element.relativePath)) + "/"
		let dir_name = path.join(`${process.cwd()}/${configs.output}`, base_dir + file)
		fs.mkdirSync(dir_name, { recursive: true })
		let config = {
			entry: element.path,
			output: {
				path: dir_name,
				filename: "index.js"
			},
			plugins: [new HtmlWebpackPlugin()]
		}
		webpackConfigs.push(config)
	};
	const dirCallback = function(element, stat) {
		// fs.mkdirSync(element.path,{recursive:true})
		//console.log(element)
	};
	dree.scanAsync(configs.pages, options, fileCallback, dirCallback)
		.then(() => {
			console.log("-> Running Webpack")
			webpack(webpackConfigs, function(err, stats) {
				if (err || stats.hasErrors()) {
					console.error("Failed run Webpack !")
					console.error(err)
				}
				console.log("Successful !")
			})
		})

}
