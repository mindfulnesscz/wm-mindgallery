const path = require( "path" );
const defaultConfig = require( "@wordpress/scripts/config/webpack.config" );

module.exports = {
	...defaultConfig,

	entry: {
		"../../assets/js/index": "./src/index.js",
	},

	output: {
		filename: "[name].js",
		path: path.resolve( __dirname, "dist" ),
	},
};
