const path = require('path');

module.exports = [
	{
		entry: './src/Core/main.js',
		mode: "production",
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'turtle.js',
			globalObject: 'this',
			library: {
				name: 'turtle',
				type: 'umd',
			}
		}
	},
		{
			entry: './src/UI/scripts/main.js',
			mode: "production",
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: 'turtleUI.js',
				globalObject: 'this',
				library: {
					name: 'turtleUI',
					type: 'umd',
				}
			}
		}
]