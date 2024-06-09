#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/6/6 16:31
# @Author  : pointer
# @File    : demo5.py
# @Software: PyCharm

import requests
import json
import execjs


def load_js():
  with open("demo5.js", "r") as f:
    js = f.read()
    return execjs.compile(js)


exc = load_js()
def items_gdzwfw(page:int):
  url = "https://ygp.gdzwfw.gov.cn/ggzy-portal/search/v2/items"

  data = {
      "type": "trading-type",
      "openConvert": False,
      "keyword": "",
      "siteCode": "44",
      "secondType": "A",
      "tradingProcess": "",
      "thirdType": "[]",
      "projectType": "",
      "publishStartTime": "",
      "publishEndTime": "",
      "pageNo": page,
      "pageSize": 10
  }
  payload = json.dumps(data)


  headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Cookie': '_horizon_uid=5c80488b-2511-4ccd-ac22-7bd6374e55ec',
    'Origin': 'https://ygp.gdzwfw.gov.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://ygp.gdzwfw.gov.cn/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    # 'X-Dgi-Req-App': 'ggzy-portal',
    # 'X-Dgi-Req-Nonce': 'HS4VLk2X4lUMbAKB',
    # 'X-Dgi-Req-Signature': 'ce680940bcf392bdb40dfc4b717f4d8236309c81421dc2ec478f3414da3a3906',
    # 'X-Dgi-Req-Timestamp': '1717662619718',
    'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
  }
  h_ = exc.call("u",data)
  headers.update(h_)
  headers['X-Dgi-Req-Timestamp'] = str(headers['X-Dgi-Req-Timestamp'] )
  response = requests.request("POST", url, headers=headers, data=payload)
  return response.json()


print(items_gdzwfw(2))