const path = require("path")

module.exports = [
	{
		entry: path.join(__dirname, "./../../../UI/js/main.js"),
		mode: "production",
		output: {
			path: path.resolve(__dirname, "./../../../dist"),
			filename: 'ui.turtle.js',
			globalObject: 'this',
			library: {
				name: 'TurtleUI',
				type: 'umd',
			}
		}
	}
]