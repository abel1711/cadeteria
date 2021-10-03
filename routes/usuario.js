const {Router} = require('express');
const {check} = require('express-validator');
const { crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuario');
const { validarDatos } = require('../middlewares/validar-datos');


const router = Router();

router.post('/',[
    check('email', 'No es un email correcto').isEmail(),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('rol','El rol es obligatorio').notEmpty(),
    validarDatos
], crearUsuario);
router.get('/', obtenerUsuarios);

router.get('/:id', [
    check('id','No es un id de mongo').isMongoId(),
    validarDatos
], obtenerUsuario);

router.put('/:id', [
    check('id','No es un id de mongo').isMongoId(),
    validarDatos
], actualizarUsuario);

router.delete('/:id', [
    check('id','No es un id de mongo').isMongoId(),
    validarDatos
], borrarUsuario);


module.exports=router;