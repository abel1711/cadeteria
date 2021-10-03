const {Schema, model} = require('mongoose');


const SchemaUsuario = new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true, 'El email es obligatorio'],
        unique:true
    },
    rol:{
        type:String,
        required:[true, 'El rol es obligatorio']
    },
    contraseña:{
        type:String,
        require:[true, 'La contraseña es obligatoria']
    },
    estado:{
        type:Boolean,
        require:true,
        default:true
    }
});

SchemaUsuario.methods.toJSON = function (){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return  usuario;
}

module.exports= model('Usuario', SchemaUsuario);
