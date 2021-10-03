


const controlSocket = ( socket, io)=>{

    socket.on('connect',()=>{
        console.log(socket.id);
    })

}


module.exports={
    controlSocket
}