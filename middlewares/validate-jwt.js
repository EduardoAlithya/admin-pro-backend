const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header("x-token");
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: "no existe token en la demanda"
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SALT);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "error tecnico ver logs : " + error
        })
    }


}

module.exports = {
    validarJWT
}