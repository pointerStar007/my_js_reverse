# 目标

- url：http://shanzhi.spbeen.com/login/
- 这是一个爬虫入门级练手网站，并不是真正的业务网站，文件逻辑简单，甚至不用打断点，直接全扣，然后通过 excejs 调用即可
- 难度入门级，主要加密参数为 password
- 需要注意的是，需要将CSRF token 带上
- csrfmiddlewaretoken
- 整体没啥好说的，eval 混淆,将 eval替换成 console.log 在控制台输出，很快就可以还原JavaScript

~~~
function doLogin() {
    var password_old = $("#MemberPassword").val();
    var encrypt = new JSEncrypt();
    var public_key = $("#pk").val();
    encrypt.setPublicKey(public_key);
    var pass_new = encrypt.encrypt(password_old);
    $("#MemberPassword").val(pass_new);
    $("#login_button").submit()
}
~~~
