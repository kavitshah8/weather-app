const validator = require('webpack-validator');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {

	entry: [
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
			{
				test: /\.js|jsx$/, loaders: ['react-hot', 'babel'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/, loaders: ['style', 'css']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({filename: '../../index.html', template: './src/index.tpl.html'}),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = validator(config);

