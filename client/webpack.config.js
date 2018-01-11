var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');


var dashboard = new Dashboard();

module.exports = {

  context: __dirname + '/src', 
  entry: [
    'babel-polyfill',
    './index.js', 
  ],
  output: {
    filename: 'app.js', 
    path: __dirname + '/dist' 
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.bundle\.js$/, loader: 'bundle-loader', options: { lazy: true } },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ use: 'css-loader' }) },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.ico$/, loader: "url-loader?limit=100000" },
       { test: /\.(jpe?g)$/i, loaders: [
            'file-loader?hash=sha512&digest=hex',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ] },
      {test: /manifest.json$/, loader: 'file-loader?name=manifest.json!web-app-manifest-loader' },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          presets: ["env", "react", "stage-0"],
          plugins: [
              ["transform-decorators-legacy"],
              ["transform-runtime"]
            ]
          }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      }

    ]
  },

  devServer: {
    hot: true,
    quiet: true, 
    historyApiFallback: true,
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      DEV: true,
    }),
    new DashboardPlugin(dashboard.setData),
    new HtmlWebpackPlugin({
      title: 'simple-boilerplate',
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),
  ]
}