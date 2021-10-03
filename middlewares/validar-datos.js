const {validationResult} = require('express-validator');



const validarDatos = (req, res, next)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        res.status(400).json(error);
    };
    next();
};


module.exports={
    validarDatos
}