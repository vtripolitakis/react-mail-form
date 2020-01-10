const path = require('path');

const config = {
  entry: {
    all: './src/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-mail-form.js',
    publicPath: '/assets/static/js/react-mail-form/',
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
