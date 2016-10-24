const validator = require('webpack-validator');
const path = require('path');
const webpack = require('webpack');

const config = {

	entry: [
		'babel-polyfill',
	    'webpack-dev-server/client?http://localhost:3443',
        'webpack/hot/dev-server',
		path.join( __dirname, 'src/Router.jsx')
	],
	output: {
		path: path.join( __dirname, 'public/assets/js/'),
		filename: 'build.js',
		publicPath: '',		
	},
	module: {
		loaders: [
			{ test: /\.js|jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'babel'] },
			{ test: /\.css$/, loaders: ['style', 'css'] }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = validator(config);

