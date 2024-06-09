#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/6/6 2:11
# @Author  : pointer
# @File    : demo.py
# @Software: PyCharm


import time
import random
import requests


def gen_o(t):
    tkeyIndex = -1
    chars = "0123456789abcdef"
    str_list = []
    for i in range(6):
        c = t[tkeyIndex + 1]
        str_list.append(c)
        tkeyIndex = chars.index(c) if c in chars else -1
        if tkeyIndex < 0 or tkeyIndex > len(t):
            tkeyIndex = i
    o = "".join(str_list)
    return o

def fetch(page):
    cookies = {
        'ICITYSession': '503c12c90e5f48d99f086a1cc968d361',
    }

    headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        # 'Cookie': 'ICITYSession=503c12c90e5f48d99f086a1cc968d361',
        'Origin': 'http://tzxm.jxzwfww.gov.cn',
        'Pragma': 'no-cache',
        'Referer': 'http://tzxm.jxzwfww.gov.cn/icity/ipro/open/publicity',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
    }

    # t = parseInt(Math.random() * (9999 - 1000 + 1) + 1000) + "_" + c87167 + "_" + Date.parse(new Date());
    s = "d435381717609952551"
    t = f"{int(random.random() * 9000 + 1000)}_{gen_o(s)}_{int(time.time()) * 1000}"
    o = gen_o(t)
    t.replace("+", "_")

    data = {"page": str(page), "rows": "10", "type": "0", "year": "2024", "projectName": "", "flag": "", "projectCode": ""}
    url = f"http://tzxm.jxzwfww.gov.cn/icity/api-v2/jxtzxm.app.icity.ipro.IproCmd/getDisplayListByPage?s={s}&t={t}&o={o}"
    return requests.post(url, cookies=cookies, headers=headers, json=data, ).json()


print(fetch(30))
