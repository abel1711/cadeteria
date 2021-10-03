const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');

const crearUsuario= async (req, res )=>{
    const { nombre, email, rol, contraseña, estado} = req.body;

    try {
        const usuario = await new Usuario({ nombre, email, rol, estado});
        const genSalt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync( contraseña, genSalt);
        usuario.contraseña = password;
        await usuario.save();
        res.json({usuario});
    } catch (error) {
        res.json({error});
    }
  
};

const obtenerUsuarios = async (req, res) => {

    try {
        const usuarios = await Usuario.find({estado:true});
        res.json({
            total: usuarios.length,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.json({error});
    }

}

const obtenerUsuario = async (req, res)=>{
    const {id} = req.params;
    try {
        const usuario = await Usuario.findById(id);
        if(usuario){
            res.json({usuario});
        }else{
            res.json({
                msg:`No existe un usuario con el id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
    res.json({
        msg:'desde get user',
        id
    })

}

const actualizarUsuario = async (req, res)=>{
    const {id} = req.params;
    const { email, estado, contraseña, ...data} = req.body;
    try {
        if(contraseña){
            const salt = bcryptjs.genSaltSync();
            data.contraseña = bcryptjs.hashSync(contraseña, salt);//encriptar contraseña
        }
    
        const usuario = await Usuario.findByIdAndUpdate(id, data);
        
        res.json(usuario);


    } catch (error) {
        console.log(error);
        res.json(error)
        
    }

}

const borrarUsuario = async (req, res)=>{
    const {id} = req.params;
    try {
        let usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
        usuario = await Usuario.findById(id);
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.json(error);
        
    }
}


module.exports={
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    borrarUsuario
}