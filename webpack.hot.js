const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
]

//1.独立css
plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('develop-hot')
}));

plugins.push(new ExtractTextPlugin({
  filename:'app.css'
}));

//2.动态嵌入静态资源
plugins.push(new HtmlWebpackPlugin({
  title : 'OA',
  filename: '../index.html',
  template: './src/Template/index.html',
  hash: true
}));

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      './src/Main'
    ],
  },
  output: {
    path : path.resolve(__dirname,"/build"),
    publicPath:"/build/",
    filename:"[name].js",
    chunkFilename: '[name].[chunkhash:5].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /^node_modules$/,
        include: [APP_PATH],
        use: [
          { loader: 'react-hot-loader' },
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
          //{ loader: 'eslint-loader' },
        ]
      },
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            { loader: 'postcss-loader'},
          ]
        }))
      },
      {
        test: /\.scss/,
        exclude: /^node_modules$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
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
        }))
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
  plugins,
  devServer:{
    contentBase:path.resolve(__dirname,"./"),
    host: '0.0.0.0',
    port: 8083,
    inline: true,
  }
};
/**
 * 配置解释，必须配合server_hot.js 一起使用：
 * entry app 'webpack-hot-middleware/client' :  塞入热加载模块，否则无法js热更新；
 * module use js/jsx loader 'react-hot-loader': 监听js、jsx代码，实现热加载；
 * module use css/scss loader 'css-hot-loader': 监听css、scss代码，实现热加载（压缩的css代码不能是动态的，即后面不能带hash值， 否则就监听不到）；
 * module use js/jsx babel-loader => "libraryName": "antd" : 达成antd组件按需加载
 * module use js/jsx 'eslint-loader' : 代码规范加载，达成代码修正，需要配合eslintrc文件使用；
 * */