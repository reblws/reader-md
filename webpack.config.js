const webpack = require('webpack')

module.exports = {
    entry: "./app/index.js",
    output: {
      path: __dirname + '/dist',
      filename: "bundle.min.js"
    },
    plugins: [
      new webpack.DefinePlugin({
        '__DEV__': false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: true
        }
      })
    ]
};
