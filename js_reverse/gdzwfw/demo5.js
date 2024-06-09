const CryptoJS = require("crypto-js");
//
//
function dne(e, t) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * e + 1, 10);
        case 2:
            return parseInt(Math.random() * (t - e + 1) + e, 10);
        default:
            return 0
    }
}

const lF = "zxcvbnmlkjhgfdsaqwertyuiop0987654321QWERTYUIOPLKJHGFDSAZXCVBNM"

function hne(e) {
    return [...Array(e)].map(() => lF[dne(0, 61)]).join("")
}

function pne(e) {
    let t = "";
    return typeof e == "object" ? t = Object.keys(e).map(n => `${n}=${e[n]}`).sort().join("&") : typeof e == "string" && (t = e.split("&").sort().join("&")),
        t
}

//
function u(data) {
    // _o.inc();
    const
        a = Date.now()
        // a = 1717664472826
        , l = hne(16)
        // , l = "su3AriUkkMmXJAku"
        , c = "k8tUyS$m"
        , d = {
            ['X-Dgi-Req-App']: 'ggzy-portal',
            ['X-Dgi-Req-Nonce']: l,
            ["X-Dgi-Req-Timestamp"]: a
        };
    // const p = t1({
    //     p: sC.stringify(data, {
    //         allowDots: !0
    //     }),
    //     t: a,
    //     n: l,
    //     k: c
    // });
    let queryString = Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    var r = pne(queryString)
    var message = l + c + decodeURIComponent(r) + a
    const p = CryptoJS.SHA256(message)
    d[['X-Dgi-Req-Signature']] = p.toString(CryptoJS.enc.Hex)
    return d
}

//
data = {
    "type": "trading-type",
    "openConvert": false,
    "keyword": "",
    "siteCode": "44",
    "secondType": "A",
    "tradingProcess": "",
    "thirdType": "[]",
    "projectType": "",
    "publishStartTime": "",
    "publishEndTime": "",
    "pageNo": 49,
    "pageSize": 10
}
// keyword=&
// openConvert=false&
// pageNo=43&
// pageSize=10&
// projectType=&
// publishEndTime=&
// publishStartTime=&
// secondType=A&
// siteCode=44&
// thirdType=[]&
// tradingProcess=&
// type=trading-type

// var message = "su3AriUkkMmXJAkuk8tUyS$mkeyword=&openConvert=false&pageNo=49&pageSize=10&projectType=&publishEndTime=&publishStartTime=&secondType=A&siteCode=44&thirdType=[]&tradingProcess=&type=trading-type1717664472826"
// // let hash = CryptoJS.SHA256(message);
// // console.log(hash.toString(CryptoJS.enc.Hex))
//
d = u(data)
console.log(d)

