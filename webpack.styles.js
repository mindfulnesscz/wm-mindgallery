const path = require( "path" );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		"../assets/css/style": "./src/sass/style.sass",
    "../assets/css/vendors/mind-gallery-nomodule": "./src/sass/style-frontend.sass",
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
      // postcss-loader has config file in src/postcss.config.js   
			use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', { loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [ require('path').resolve(__dirname, 'node_modules') ]
          }   
        }
      }],       
		},
	]},
};