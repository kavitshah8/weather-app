module.exports = {

	entry: './src/Router.jsx',

	output: {
		path: './public/assets/js',
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
