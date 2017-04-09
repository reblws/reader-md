var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
      path: __dirname + '/dist',
      filename: "bundle.min.js"
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    },
    plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};
