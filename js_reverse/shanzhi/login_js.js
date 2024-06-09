window = global
const JSEncrypt = require('./a')

function doLogin(password_old, key) {
    // var password_old = $("#MemberPassword").val();
    // var password_old = passwod;
    var encrypt = new JSEncrypt();
    // var public_key = $("#pk").val();
    var public_key = key;

    encrypt.setPublicKey(public_key);
    var pass_new = encrypt.encrypt(password_old);
    return pass_new
    // $("#MemberPassword").val(pass_new);
    // $("#login_button").submit()
}



