const validator = require('webpack-validator');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {

	entry: [
		'babel-polyfill',
	    'webpack-dev-server/client?http://localhost:3443',
        'webpack/hot/dev-server',
		path.join( __dirname, 'src/Router.jsx')
	],
	output: {
		path: path.join( __dirname, 'public/js/'),
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
		new HtmlWebpackPlugin({filename: '../../index.html', template: './src/index.tpl.html'}),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([
			{from: path.join(__dirname, 'src', 'assets', 'images'), to: '../images'}
		])
	]
};

module.exports = validator(config);

