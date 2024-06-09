// 引入 Express 模块
const express = require('express');
const {response} = require("express");
const encrypt = require("./wbp.js")
const app = express();
const port = 3000;

// 使用 express.json() 中间件来解析 JSON 格式的请求体
app.use(express.json());

// 定义一个路由处理函数
app.post('/encrypt', (req, res) => {
      e = req.body.e
      publick_key = req.body.publick_key
      const param = encrypt(publick_key,e)
      res.json(
          {
                code:0,
                param:param
          }
      )
});

// 启动服务器并监听指定端口
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});