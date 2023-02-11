const path = require('path');

module.exports = [
	{
		entry: './src/Client/Core/main.js',
		mode: "production",
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'turtle.client.js',
			globalObject: 'this',
			library: {
				name: 'turtle',
				type: 'umd',
			}
		}
	},
		{
			entry: './src/Client/UI/scripts/main.js',
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