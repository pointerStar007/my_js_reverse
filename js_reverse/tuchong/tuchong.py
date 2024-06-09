#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/5/26 18:06
# @Author  : pointer
# @File    : tuchong.py
# @Software: PyCharm


# https://tuchong.com/  图虫，社区

# 已破解

import requests
import execjs
with open("my_encrypt.js", "r", encoding="utf8") as f:
    js = f.read()
    ctx = execjs.compile(js)
    password = ctx.call("_rsaEncrypt","<your pass word>")
    session = requests.session()
    result = session.post("https://tuchong.com/rest/accounts/login?_signature=_02B4Z6wo001010jB.YwAAIDBxunXJKVQlM9IxfkAALRuFRGCcpp1P8tKPD8wBFKtBoy0ttmCl3Bfvx4vO4eiLiSUN5j1Y61l0mnLSqAdFTXDosmjB.r5ZM.C5FP0A3WXbmaiZ--2JeQCA78sc5",
                 data={"zone":"0086","account":"<your username>","password":password})
    print(result.json())
