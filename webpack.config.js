const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtracPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dists'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js']
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
            filename: 'imges/[name][hash][ext]'
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
  ],

  //PARA OPTIMIZAR LOS CSS
  optimization: {
    minimize: true,
    minimizer: [
      '...', // Extiende los minimizers existentes, como `terser-webpack-plugin`
      new CssMinimizerPlugin(),
    ]
  }
}

