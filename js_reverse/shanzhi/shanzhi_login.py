#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/5/26 15:17
# @Author  : Pointer
# @File    : shanzhi_login.py
# @Software: PyCharm

import execjs
import requests
from lxml import etree


headers = {
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Referer":"http://shanzhi.spbeen.com/login/",
    "Content-Type":"application/x-www-form-urlencoded"
}

session = requests.session()
html = session.get("http://shanzhi.spbeen.com/login/",headers=headers).text

csrfmiddlewaretoken = etree.HTML(html).xpath("""//input[@name="csrfmiddlewaretoken"]/@value""")[0]
key = etree.HTML(html).xpath("""//input[@id='pk']/@value""")[0]


with open("login_js.js", "r", encoding="utf-8") as f:
    print(session.cookies)
    print(csrfmiddlewaretoken)
    print(key)
    js = f.read()
    ctx = execjs.compile(js)
    newpassword = ctx.call("doLogin","<youpassword>",key)
    print("newpassword: ", newpassword)
    res = session.post("http://shanzhi.spbeen.com/login/",data={
        "username":"pointer",
        "password":newpassword,
        "csrfmiddlewaretoken":csrfmiddlewaretoken
    },headers=headers)
    print(res.cookies)
    print(session.get("http://shanzhi.spbeen.com/detail/?id=2628").text)