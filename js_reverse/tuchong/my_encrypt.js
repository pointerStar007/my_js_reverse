const RSAKey = require("./rsa")

var RSA_PUBLIC_KEY = "D8CC0180AFCC72C9F5981BDB90A27928672F1D6EA8A57AF44EFFA7DAF6EFB17DAD9F643B9F9F7A1F05ACC2FEA8DE19F023200EFEE9224104627F1E680CE8F025AF44824A45EA4DDC321672D2DEAA91DB27418CFDD776848F27A76E747D53966683EFB00F7485F3ECF68365F5C10C69969AE3D665162D2EE3A5BA109D7DF6C7A5";
function _rsaEncrypt(key) {
        var rsa =  new RSAKey();
        rsa.setPublic(RSA_PUBLIC_KEY, "10001");
        return rsa.encrypt(encodeURIComponent(key));
}

console.log(_rsaEncrypt("1"));