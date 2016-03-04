var path = require('path');
var webpack = require('webpack');
require('babel-polyfill');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel-loader'],
            include: path.join(__dirname, 'src')
        },
        { 
            test: /\.css$/, 
            loader: 'css-loader' 
        },
    ]
  },
  resolve: {
        modulesDirectories: [
            'node_modules',
        ],
        root: [
            './src',
        ],
        extensions: ['', '.js', '.jsx']
    },
};
