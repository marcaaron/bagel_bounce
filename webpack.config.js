const { resolve } = require('path')

module.exports = {
  entry: './app/Root.jsx',
  output: {
    path: resolve(__dirname, './public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, './app'),
        exclude: '/node_modules',
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      index: './public/index.html'
    }
  }
}
