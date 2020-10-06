const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "index_bundle.js",
		publicPath: "/",
	},
	devServer: {
		host: "localhost",
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 3000,
		historyApiFallback: true,
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path][name].[ext]",
							outputPath: "static/assets/",
							publicPath: "static/assets/",
						},
					},
				],
			},
		],
	},
	mode: "development",
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
			inject: true,
		}),
	],
};
