const path = require( "path" );
const defaultConfig = require( "@wordpress/scripts/config/webpack.config" );

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	...defaultConfig,

	entry: {
		"../../../html/myb.com/wp-content/plugins/mindgallery-block/assets/css/style": "./src/sass/style.sass",
	},

	output: {
		// filename: '[name].[hash:4].js',
		filename: "[name].js",
		path: path.resolve( __dirname, "dist" ),
	},

	plugins: [
		new MiniCssExtractPlugin( {
			filename: '[name].css',
			chunkFilename: '.[name].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		} ),
	],

	module: {
		rules: [ {
			test: /\.s(a|c)ss$/,
			use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ], // postcss-loader has config file in src/postcss.config.js         
		},
	]},
};