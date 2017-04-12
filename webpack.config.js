const webpack = require('webpack')

module.exports = {
    entry: "./app/index.js",
    output: {
      path: __dirname + '/dist',
      filename: "bundle.min.js"
    },
    plugins: [
      new webpack.DefinePlugin({
        '__DEV__': false // Set this to true for development
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
};
