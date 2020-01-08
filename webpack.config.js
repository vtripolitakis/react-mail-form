/* jshint esversion: 6 */
/* globals require, __dirname, module */

const path = require("path")

const config = {
    entry: {
        all: "./src/start.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "react-mail-form.js"
    },
    devtool: "source-map",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}

module.exports = config

