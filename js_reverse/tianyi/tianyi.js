let CryptoJS = require("crypto-js")



var encrypted = CryptoJS.DES.encrypt("tianyi_could999", "1")


console.log(encrypted.toString())
// i.Z.DES.encrypt(encodeURIComponent("tianyi_could999"), "1")
