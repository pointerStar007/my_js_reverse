# 目标
- 天翼云登录接口

- https://www.ctyun.cn/h5/auth/login

- 全局搜索关键字 `encrypt(`
![img.png](img.png)
- 瞬间找到登录加密，看代码好像是个 DES 加密
- 直接使用 `crypto-js` 提供的标准 DES 进行加密验证
- 发现果然就是标准 DES 加密，确实有点草率 /doge/
- 抬走，下一位