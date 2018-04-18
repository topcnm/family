var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.hot');
var proxyMiddleware = require('http-proxy-middleware');

var bodyParser = require("body-parser");
var app = express();
var compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  stats: {
    colors: true,
  }
}));

// 代理服务器, 到时候替换成后端接口和地址
app.use('/blog', proxyMiddleware({
  target: 'http://localhost:5000',
  changeOrigin: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

//监听请求
app.post('/api/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  /*
  setTimeout(function(){
    if (username == 'admin' && password == '123456' ){
      res.send({ code: '0', data: userInfo });
    }else{
      res.send({ code:'999', data: null, msg: '账号或者密码错误' });
    }
    res.end();
  }, 1000);
  */
});

app.post('/api/logout', function(req, res) {
  /*
  setTimeout(function(){
    res.send({ code: '0', data: null });
    res.end();
  }, 1500)
  */
});


//将其他路由，全部返回index.html
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(8084, function() {
  console.log('正常打开8084端口')
});

