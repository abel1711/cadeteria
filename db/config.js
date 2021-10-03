const mongoose = require('mongoose');



const conectarMongodb = async ()=>{

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Base de Datos Online!');
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo iniciar la Base de Datos');
    }


}

module.exports={
    conectarMongodb
}