var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path=require('path');
module.exports = {
  context: __dirname,
  devtool: debug ? "sourcemap" : false,//or sourcemap
  entry: "./octagrid/gridapp.ts",
  output: {
    path: __dirname + "/dist",
    filename: "octagrid.min.js"
  },
  module: {
    rules: [
     {
       test: /\.ts$/,
       loader: 'ts-loader',
       include:path.resolve(__dirname,'octagrid'),
       exclude: /node_modules/,
     },
   ]
  },
  resolve:{
    extensions: [".tsx", ".ts", ".js"]
  }
  ,
  plugins: debug ? [] : [
    //remove duplicate codes
   // new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    //uglify
   // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};