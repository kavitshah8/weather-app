const validator = require('webpack-validator');
const path = require('path');

const config = {

	entry: path.join( __dirname, 'src/Router.jsx'),

	output: {
		path: path.join( __dirname, 'public/assets/js'),
		filename: 'app.js'
	},

	module: {
		loaders: [
			{
				test: /\.js|jsx$/, loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.css$/, loaders: ['style', 'css']
			}
		]
	}
};

module.exports = validator(config);

