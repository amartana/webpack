const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtracPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dists'),
    filename: 'main.js'
  },
  mode: "production",
  resolve: {
    extensions: ['.js'],
    alias:{
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@templates': path.resolve(__dirname, 'src', 'templates'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@images': path.resolve(__dirname, 'src', 'assets', 'images'),
    }
  },
  module: {
    rules:
      [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtracPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
          generator: {
            filename: 'images/[name][hash][ext]'
          }
        },
        {
          test: /\.woff(2)?/,
          type: "asset/resource",
          generator: {
            filename: 'fonts/[name][hash][ext]'
          }
        }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtracPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, 'src/assets/images'), to: "assets/images" },
    //   ],
    // }),
    new Dotenv(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
  }
}

