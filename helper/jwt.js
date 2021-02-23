const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT =  ( uid ) => {
    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        }
    
        jwt.sign( payload, process.env.JWT_SALT, {
            expiresIn: '12h',
        }, (err, toke) => {
            if ( err ) {
                console.log( err );
                reject( "error generar token: " + err );
            } else  {
                resolve( toke );
            }
        });
    })
}

module.exports = {
    generarJWT
}