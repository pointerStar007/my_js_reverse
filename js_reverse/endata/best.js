const CryptoJS = require("crypto-js");
var _0x51eedc = {
    'pKENi': function _0x2f627(_0x5b6f5a, _0x440924) {
        return _0x5b6f5a === _0x440924;
    },
    'wnfPa': 'ZGz',
    'VMmle': '7|1|8|9|5|2|3|6|0|4',
    'GKWFf': function _0x1a4e13(_0x40cfde, _0x16f3c2) {
        return _0x40cfde == _0x16f3c2;
    },
    'MUPgQ': function _0x342f0d(_0x19038b, _0x4004d6) {
        return _0x19038b >= _0x4004d6;
    },
    'hLXma': function _0x55adaf(_0x45a871, _0x161bdf) {
        return _0x45a871 + _0x161bdf;
    },
    'JdOlO': function _0x13e00a(_0x5899a9, _0x4bb34d) {
        return _0x5899a9 + _0x4bb34d;
    },
    'qrTpg': function _0x1198fb(_0x55b317, _0x22e1db, _0x1b091a) {
        return _0x55b317(_0x22e1db, _0x1b091a);
    },
    'pdmMk': function _0xe2b022(_0x4af286, _0x4c2fd4) {
        return _0x4af286 - _0x4c2fd4;
    },
    'xVKWW': function _0x1094a3(_0x5f3627, _0x2a0ac5, _0x3ad2e5) {
        return _0x5f3627(_0x2a0ac5, _0x3ad2e5);
    }
};
var _0x4da59e = {
    'bUIIa': function _0x2a2af9(_0x779387, _0x4a4fec) {
        return _0x779387 + _0x4a4fec;
    }
};
var _0x9843d3 = function (_0x29d556, _0xcc6df, _0x3d7020) {
    if (0x0 == _0xcc6df)
        return _0x29d556['substr'](_0x3d7020);
    var _0x48914b;
    _0x48914b = '' + _0x29d556['substr'](0x0, _0xcc6df);
    return _0x48914b += _0x29d556['substr'](_0x4da59e['bUIIa'](_0xcc6df, _0x3d7020));
};


mydecrypt = function (ciphertext) {
    var _0x554c90 = _0x51eedc['JdOlO'](_0x51eedc['qrTpg'](parseInt, ciphertext[_0x51eedc['pdmMk'](ciphertext['length'], 0x1)], 0x10), 0x9)
        , _0x2cf8ae = _0x51eedc['xVKWW'](parseInt, ciphertext[_0x554c90], 0x10);
    ciphertext = _0x9843d3(ciphertext, _0x554c90, 0x1);
    _0x554c90 = ciphertext['substr'](_0x2cf8ae, 0x8);
    ciphertext = _0x9843d3(ciphertext, _0x2cf8ae, 0x8);
    _0x2cf8ae = CryptoJS['enc']['Utf8']['parse'](_0x554c90);
    _0x554c90 = CryptoJS['enc']['Utf8']['parse'](_0x554c90);

    return CryptoJS["DES"]['decrypt']({
        'ciphertext': CryptoJS['enc']['Hex']['parse'](ciphertext)
    }, _0x2cf8ae, {
        'iv': _0x554c90,
        'mode': CryptoJS['mode']['ECB'],
        'padding': CryptoJS['pad']['Pkcs7']
    })['toString'](CryptoJS['enc']['Utf8']);
}


module.exports = mydecrypt