#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/6/10 0:43
# @Author  : pointer
# @File    : demo.py.py
# @Software: PyCharm


from curl_cffi import requests
# import requests
# import execjs

# def load_js():
#     with open("wbp.js","r",encoding="utf8") as f:
#         js = f.read()
#         return execjs.compile(js)
#
#
# ctx = load_js()
url = "https://ec.minmetals.com.cn/open/homepage/public"

payload = {}
headers = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'zh-CN,zh;q=0.9',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
  'Content-Length': '0',
  'Cookie': '__jsluid_s=863a3c41eb1eddb5a8cd486793487c65; SUNWAY-ESCM-COOKIE=ae9ce526-8ce8-4e5b-8ded-50ade973be9f; JSESSIONID=9E0891448E7D6CAF76009CCA3737B6C8',
  'Origin': 'https://ec.minmetals.com.cn',
  'Pragma': 'no-cache',
  'Referer': 'https://ec.minmetals.com.cn/open/home/purchase-info',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"'
}
e = {
    "inviteMethod": "",
    "businessClassfication": "",
    "mc": "",
    "lx": "ZBGG",
    "dwmc": "",
    "pageIndex": 2
}
# publick_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXQpKejn7xBAvNpAGz7uXCZ2p8GmKRgtjSHpTu/60isilrNKEJXEkyghBPijH0X024kDc27X2kAVANuzF7MSzA9G0on0z2nViIaciu5Wq1jMpw+zO/L3DRcZ32djjYje5yJGuU8ATTb9rvegGogN4P5J7OIg6flCY/Xy12oH282QIDAQAB"


publick_key = requests.request("POST", url, headers=headers, data=payload).text
params = requests.post("http://127.0.0.1:3000/encrypt",json={
    "e":e,"publick_key":publick_key
}).json()["param"]
# params = ctx.call("encrypt",publick_key,e)
result = requests.post("https://ec.minmetals.com.cn/open/homepage/zbs/by-lx-page",json={
        "param":params
    }).text
print(result)


