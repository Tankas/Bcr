let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './app/entry.js',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".less"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: path.join(__dirname, 'template/index.html')
    })
  ]
}