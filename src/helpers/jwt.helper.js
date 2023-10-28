const jwt = require('jsonwebtoken');

/**
 * 
 * private function generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
let generateToken = (user, secretSignature, tokenLife) =>{
    // Data
    const userData = {
        _id : user._id,
        name : user.displayName,
        age : user.age,
        gender : user.gender,
    }
    return jwt.sign(
        {data: userData},
        secretSignature,
        {
            algorithm: "HS256",
            expiresIn: tokenLife,
        }
    );
}
/**
 * function verify token
 * @param {*} token 
 * @param {*} secretKey 
 * @returns decoded
 */
let verifyToken = (token, secretKey) =>{
    return new Promise((resolve, reject) =>{
        jwt.verify(token, secretKey, (error, decoded) =>{
            if (error) {
                return reject(error)
            }
            return resolve(decoded)
        })
    })
}

module.exports = {
    generateToken : generateToken,
    verifyToken : verifyToken
}