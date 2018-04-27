/* jshint esversion: 6 */
/* globals require, __dirname, module */

const path = require("path")

const config = {
    entry: {
        all: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    devtool: "source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["react","env"]
                    }
                }
            }
        ]
    }
}

module.exports = config

