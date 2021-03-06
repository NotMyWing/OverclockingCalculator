import * as path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MinifyPlugin from "babel-minify-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

const cfg = {
	mode: process.env.NODE_ENV || "development",
	entry: "./src/index.tsx",
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MinifyPlugin(
			{
				evaluate: false,
				mangle: true,
			},
			{
				comments: false,
			},
		),
		new OptimizeCSSAssetsPlugin({}),
		new MiniCssExtractPlugin({}),
	],
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Minifies CSS
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.css$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Minifies CSS
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					"css-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{
				enforce: "pre",
				test: /\.tsx?$/,
				loader: "eslint-loader",
				options: {
					emitError: true,
				},
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			},
		],
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			react: "preact/compat",
			"react-dom": "preact/compat",
		},
	},
	devtool: "source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 8080,
		disableHostCheck: true,
	},
};

module.exports = cfg;
