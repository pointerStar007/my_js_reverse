it = {}
Ca = {
    exports: {}
};
(function(e, t) {
    (function(n, r) {
        e.exports = r()
    }
    )(it, function() {
        var n = n || function(r, i) {
            var a;
            if (typeof window != "undefined" && window.crypto && (a = window.crypto),
            typeof self != "undefined" && self.crypto && (a = self.crypto),
            typeof globalThis != "undefined" && globalThis.crypto && (a = globalThis.crypto),
            !a && typeof window != "undefined" && window.msCrypto && (a = window.msCrypto),
            !a && typeof it != "undefined" && it.crypto && (a = it.crypto),
            !a && typeof cQ == "function")
                try {
                    a = require("crypto")
                } catch {}
            var s = function() {
                if (a) {
                    if (typeof a.getRandomValues == "function")
                        try {
                            return a.getRandomValues(new Uint32Array(1))[0]
                        } catch {}
                    if (typeof a.randomBytes == "function")
                        try {
                            return a.randomBytes(4).readInt32LE()
                        } catch {}
                }
                throw new Error("Native crypto module could not be used to get secure random number.")
            }
              , c = Object.create || function() {
                function v() {}
                return function(m) {
                    var C;
                    return v.prototype = m,
                    C = new v,
                    v.prototype = null,
                    C
                }
            }()
              , u = {}
              , A = u.lib = {}
              , f = A.Base = function() {
                return {
                    extend: function(v) {
                        var m = c(this);
                        return v && m.mixIn(v),
                        (!m.hasOwnProperty("init") || this.init === m.init) && (m.init = function() {
                            m.$super.init.apply(this, arguments)
                        }
                        ),
                        m.init.prototype = m,
                        m.$super = this,
                        m
                    },
                    create: function() {
                        var v = this.extend();
                        return v.init.apply(v, arguments),
                        v
                    },
                    init: function() {},
                    mixIn: function(v) {
                        for (var m in v)
                            v.hasOwnProperty(m) && (this[m] = v[m]);
                        v.hasOwnProperty("toString") && (this.toString = v.toString)
                    },
                    clone: function() {
                        return this.init.prototype.extend(this)
                    }
                }
            }()
              , g = A.WordArray = f.extend({
                init: function(v, m) {
                    v = this.words = v || [],
                    m != i ? this.sigBytes = m : this.sigBytes = v.length * 4
                },
                toString: function(v) {
                    return (v || b).stringify(this)
                },
                concat: function(v) {
                    var m = this.words
                      , C = v.words
                      , R = this.sigBytes
                      , S = v.sigBytes;
                    if (this.clamp(),
                    R % 4)
                        for (var x = 0; x < S; x++) {
                            var L = C[x >>> 2] >>> 24 - x % 4 * 8 & 255;
                            m[R + x >>> 2] |= L << 24 - (R + x) % 4 * 8
                        }
                    else
                        for (var N = 0; N < S; N += 4)
                            m[R + N >>> 2] = C[N >>> 2];
                    return this.sigBytes += S,
                    this
                },
                clamp: function() {
                    var v = this.words
                      , m = this.sigBytes;
                    v[m >>> 2] &= 4294967295 << 32 - m % 4 * 8,
                    v.length = r.ceil(m / 4)
                },
                clone: function() {
                    var v = f.clone.call(this);
                    return v.words = this.words.slice(0),
                    v
                },
                random: function(v) {
                    for (var m = [], C = 0; C < v; C += 4)
                        m.push(s());
                    return new g.init(m,v)
                }
            })
              , h = u.enc = {}
              , b = h.Hex = {
                stringify: function(v) {
                    for (var m = v.words, C = v.sigBytes, R = [], S = 0; S < C; S++) {
                        var x = m[S >>> 2] >>> 24 - S % 4 * 8 & 255;
                        R.push((x >>> 4).toString(16)),
                        R.push((x & 15).toString(16))
                    }
                    return R.join("")
                },
                parse: function(v) {
                    for (var m = v.length, C = [], R = 0; R < m; R += 2)
                        C[R >>> 3] |= parseInt(v.substr(R, 2), 16) << 24 - R % 8 * 4;
                    return new g.init(C,m / 2)
                }
            }
              , w = h.Latin1 = {
                stringify: function(v) {
                    for (var m = v.words, C = v.sigBytes, R = [], S = 0; S < C; S++) {
                        var x = m[S >>> 2] >>> 24 - S % 4 * 8 & 255;
                        R.push(String.fromCharCode(x))
                    }
                    return R.join("")
                },
                parse: function(v) {
                    for (var m = v.length, C = [], R = 0; R < m; R++)
                        C[R >>> 2] |= (v.charCodeAt(R) & 255) << 24 - R % 4 * 8;
                    return new g.init(C,m)
                }
            }
              , I = h.Utf8 = {
                stringify: function(v) {
                    try {
                        return decodeURIComponent(escape(w.stringify(v)))
                    } catch {
                        throw new Error("Malformed UTF-8 data")
                    }
                },
                parse: function(v) {
                    return w.parse(unescape(encodeURIComponent(v)))
                }
            }
              , p = A.BufferedBlockAlgorithm = f.extend({
                reset: function() {
                    this._data = new g.init,
                    this._nDataBytes = 0
                },
                _append: function(v) {
                    typeof v == "string" && (v = I.parse(v)),
                    this._data.concat(v),
                    this._nDataBytes += v.sigBytes
                },
                _process: function(v) {
                    var m, C = this._data, R = C.words, S = C.sigBytes, x = this.blockSize, L = x * 4, N = S / L;
                    v ? N = r.ceil(N) : N = r.max((N | 0) - this._minBufferSize, 0);
                    var T = N * x
                      , F = r.min(T * 4, S);
                    if (T) {
                        for (var P = 0; P < T; P += x)
                            this._doProcessBlock(R, P);
                        m = R.splice(0, T),
                        C.sigBytes -= F
                    }
                    return new g.init(m,F)
                },
                clone: function() {
                    var v = f.clone.call(this);
                    return v._data = this._data.clone(),
                    v
                },
                _minBufferSize: 0
            });
            A.Hasher = p.extend({
                cfg: f.extend(),
                init: function(v) {
                    this.cfg = this.cfg.extend(v),
                    this.reset()
                },
                reset: function() {
                    p.reset.call(this),
                    this._doReset()
                },
                update: function(v) {
                    return this._append(v),
                    this._process(),
                    this
                },
                finalize: function(v) {
                    v && this._append(v);
                    var m = this._doFinalize();
                    return m
                },
                blockSize: 16,
                _createHelper: function(v) {
                    return function(m, C) {
                        return new v.init(C).finalize(m)
                    }
                },
                _createHmacHelper: function(v) {
                    return function(m, C) {
                        return new y.HMAC.init(v,C).finalize(m)
                    }
                }
            });
            var y = u.algo = {};
            return u
        }(Math);
        return n
    })
}
)(Ca);
var ay = {
    exports: {}
};
(function(e, t) {
    (function(n, r) {
        e.exports = r(Ca.exports)
    }
    )({}, function(n) {
        return function(r) {
            var i = n
              , a = i.lib
              , s = a.WordArray
              , c = a.Hasher
              , u = i.algo
              , A = [];
            (function() {
                for (var I = 0; I < 64; I++)
                    A[I] = r.abs(r.sin(I + 1)) * 4294967296 | 0
            }
            )();
            var f = u.MD5 = c.extend({
                _doReset: function() {
                    this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(I, p) {
                    for (var y = 0; y < 16; y++) {
                        var v = p + y
                          , m = I[v];
                        I[v] = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360
                    }
                    var C = this._hash.words
                      , R = I[p + 0]
                      , S = I[p + 1]
                      , x = I[p + 2]
                      , L = I[p + 3]
                      , N = I[p + 4]
                      , T = I[p + 5]
                      , F = I[p + 6]
                      , P = I[p + 7]
                      , Y = I[p + 8]
                      , K = I[p + 9]
                      , re = I[p + 10]
                      , ue = I[p + 11]
                      , Q = I[p + 12]
                      , X = I[p + 13]
                      , oe = I[p + 14]
                      , J = I[p + 15]
                      , U = C[0]
                      , G = C[1]
                      , Z = C[2]
                      , V = C[3];
                    U = g(U, G, Z, V, R, 7, A[0]),
                    V = g(V, U, G, Z, S, 12, A[1]),
                    Z = g(Z, V, U, G, x, 17, A[2]),
                    G = g(G, Z, V, U, L, 22, A[3]),
                    U = g(U, G, Z, V, N, 7, A[4]),
                    V = g(V, U, G, Z, T, 12, A[5]),
                    Z = g(Z, V, U, G, F, 17, A[6]),
                    G = g(G, Z, V, U, P, 22, A[7]),
                    U = g(U, G, Z, V, Y, 7, A[8]),
                    V = g(V, U, G, Z, K, 12, A[9]),
                    Z = g(Z, V, U, G, re, 17, A[10]),
                    G = g(G, Z, V, U, ue, 22, A[11]),
                    U = g(U, G, Z, V, Q, 7, A[12]),
                    V = g(V, U, G, Z, X, 12, A[13]),
                    Z = g(Z, V, U, G, oe, 17, A[14]),
                    G = g(G, Z, V, U, J, 22, A[15]),
                    U = h(U, G, Z, V, S, 5, A[16]),
                    V = h(V, U, G, Z, F, 9, A[17]),
                    Z = h(Z, V, U, G, ue, 14, A[18]),
                    G = h(G, Z, V, U, R, 20, A[19]),
                    U = h(U, G, Z, V, T, 5, A[20]),
                    V = h(V, U, G, Z, re, 9, A[21]),
                    Z = h(Z, V, U, G, J, 14, A[22]),
                    G = h(G, Z, V, U, N, 20, A[23]),
                    U = h(U, G, Z, V, K, 5, A[24]),
                    V = h(V, U, G, Z, oe, 9, A[25]),
                    Z = h(Z, V, U, G, L, 14, A[26]),
                    G = h(G, Z, V, U, Y, 20, A[27]),
                    U = h(U, G, Z, V, X, 5, A[28]),
                    V = h(V, U, G, Z, x, 9, A[29]),
                    Z = h(Z, V, U, G, P, 14, A[30]),
                    G = h(G, Z, V, U, Q, 20, A[31]),
                    U = b(U, G, Z, V, T, 4, A[32]),
                    V = b(V, U, G, Z, Y, 11, A[33]),
                    Z = b(Z, V, U, G, ue, 16, A[34]),
                    G = b(G, Z, V, U, oe, 23, A[35]),
                    U = b(U, G, Z, V, S, 4, A[36]),
                    V = b(V, U, G, Z, N, 11, A[37]),
                    Z = b(Z, V, U, G, P, 16, A[38]),
                    G = b(G, Z, V, U, re, 23, A[39]),
                    U = b(U, G, Z, V, X, 4, A[40]),
                    V = b(V, U, G, Z, R, 11, A[41]),
                    Z = b(Z, V, U, G, L, 16, A[42]),
                    G = b(G, Z, V, U, F, 23, A[43]),
                    U = b(U, G, Z, V, K, 4, A[44]),
                    V = b(V, U, G, Z, Q, 11, A[45]),
                    Z = b(Z, V, U, G, J, 16, A[46]),
                    G = b(G, Z, V, U, x, 23, A[47]),
                    U = w(U, G, Z, V, R, 6, A[48]),
                    V = w(V, U, G, Z, P, 10, A[49]),
                    Z = w(Z, V, U, G, oe, 15, A[50]),
                    G = w(G, Z, V, U, T, 21, A[51]),
                    U = w(U, G, Z, V, Q, 6, A[52]),
                    V = w(V, U, G, Z, L, 10, A[53]),
                    Z = w(Z, V, U, G, re, 15, A[54]),
                    G = w(G, Z, V, U, S, 21, A[55]),
                    U = w(U, G, Z, V, Y, 6, A[56]),
                    V = w(V, U, G, Z, J, 10, A[57]),
                    Z = w(Z, V, U, G, F, 15, A[58]),
                    G = w(G, Z, V, U, X, 21, A[59]),
                    U = w(U, G, Z, V, N, 6, A[60]),
                    V = w(V, U, G, Z, ue, 10, A[61]),
                    Z = w(Z, V, U, G, x, 15, A[62]),
                    G = w(G, Z, V, U, K, 21, A[63]),
                    C[0] = C[0] + U | 0,
                    C[1] = C[1] + G | 0,
                    C[2] = C[2] + Z | 0,
                    C[3] = C[3] + V | 0
                },
                _doFinalize: function() {
                    var I = this._data
                      , p = I.words
                      , y = this._nDataBytes * 8
                      , v = I.sigBytes * 8;
                    p[v >>> 5] |= 128 << 24 - v % 32;
                    var m = r.floor(y / 4294967296)
                      , C = y;
                    p[(v + 64 >>> 9 << 4) + 15] = (m << 8 | m >>> 24) & 16711935 | (m << 24 | m >>> 8) & 4278255360,
                    p[(v + 64 >>> 9 << 4) + 14] = (C << 8 | C >>> 24) & 16711935 | (C << 24 | C >>> 8) & 4278255360,
                    I.sigBytes = (p.length + 1) * 4,
                    this._process();
                    for (var R = this._hash, S = R.words, x = 0; x < 4; x++) {
                        var L = S[x];
                        S[x] = (L << 8 | L >>> 24) & 16711935 | (L << 24 | L >>> 8) & 4278255360
                    }
                    return R
                },
                clone: function() {
                    var I = c.clone.call(this);
                    return I._hash = this._hash.clone(),
                    I
                }
            });
            function g(I, p, y, v, m, C, R) {
                var S = I + (p & y | ~p & v) + m + R;
                return (S << C | S >>> 32 - C) + p
            }
            function h(I, p, y, v, m, C, R) {
                var S = I + (p & v | y & ~v) + m + R;
                return (S << C | S >>> 32 - C) + p
            }
            function b(I, p, y, v, m, C, R) {
                var S = I + (p ^ y ^ v) + m + R;
                return (S << C | S >>> 32 - C) + p
            }
            function w(I, p, y, v, m, C, R) {
                var S = I + (y ^ (p | ~v)) + m + R;
                return (S << C | S >>> 32 - C) + p
            }
            i.MD5 = c._createHelper(f),
            i.HmacMD5 = c._createHmacHelper(f)
        }(Math),
        n.MD5
    })
}
)(ay);
var hae = ay.exports

getSign = function (key){
    return hae("keyWord_"+key+"_iIndex").toString()
}

module.exports = getSign;