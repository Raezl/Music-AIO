const crypto = require("crypto");

exports.genHash = (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(salt + ":" + derivedKey.toString('hex'));
        });
    });
}



exports.verifyPassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(":");
        const keyBuffer = Buffer.from(key, 'hex');
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            //protect against timing attacks when comparing the keys
            resolve(crypto.timingSafeEqual(keyBuffer, derivedKey))
        });
    });
}