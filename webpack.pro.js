/**
 * Created by zhongwangsheng on 2017/12/4.
 */
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let plugins = []
//0. 定义环境
plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production') //定义编译环境
  }
}));

//1.独立css
plugins.push(new ExtractTextPlugin({
  filename:'[name].css'
}));

//2.动态嵌入静态资源
plugins.push(new HtmlWebpackPlugin({
  title : 'OA',
  filename: '../built/index.html',
  template: './src/Template/index.html',
  hash: true
}));

//3.抽取公共js
plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name : "vendor",
  filename :"vendor.[hash:8].js"
}));

//4.压缩JS
plugins.push(new webpack.optimize.UglifyJsPlugin({
  output : { comments: false },
  compress : { warnings: false }
}));

//清除旧文件
plugins.push(new CleanWebpackPlugin(['./built']));

module.exports = {
  entry: {
    app: './src/Main',
    vendor: [
      "react",
      "react-dom",
      "lodash",
      "moment"
    ]
  },
  output: {
    publicPath : './',
    path : __dirname + '/built',
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['es2015','react', 'stage-2'],
              compact: 'false',
              plugins: [
                'syntax-dynamic-import',
                ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
              ]
            }
          },
          //{ loader :'eslint-loader' }
        ]
      },
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            { loader: 'postcss-loader'},
          ]
        })
      },
      {
        test: /\.scss/,
        exclude: /^node_modules$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            { loader: 'sass-loader'},
            { loader: 'postcss-loader'},
          ]
        })
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: "file-loader",
            options: { name: '/font/[name].[ext]' }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /^node_modules$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 20000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins
};