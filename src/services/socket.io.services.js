const Server_Handling = require("./server_handling")
const jwtHelper = require('../helpers/jwt.helper')
const io = require('socket.io')
class SocketServices{
    constructor(server, namespaces){
        this.server = server
        this.namespaces = namespaces
        this.io = io(this.server).of(this.namespaces)
    }
    /**
     * this modulle use for get stranger services
     */
    connect
    StrangerChat(){
        this.io.on("connection", (socket) =>{  
            console.log(socket.id);
            var store_array = ['queue','allUsers','userInfo','rooms']
            this.io.emit("totalUsers", Server_Handling.totaluser('connect'))
            //GET STRANGER EVENTS
            socket.on('get-stranger', async clientToken => {
                console.log(clientToken);
                try{
                    const decoded = await jwtHelper.verifyToken(clientToken, process.env.ACCESS_TOKEN_SECRET)
                    // add data to global store
                    Server_Handling.value_handle.add(socket.id,'allUsers', socket)
                    Server_Handling.value_handle.add(socket.id,'userInfo', decoded.data)
                    // get value and join them
                    let data = Server_Handling.getstranger(socket, decoded.data)
                    if (data){
                        const ClientInQueue = data.ClientInQueue
                        const client_data = data.client_data
                        const clientInqueue_data = data.clientInqueue_data
                        const room = data.room
                        //-----------------------------------------
                        ClientInQueue.join(room)
                        socket.join(room)
                        ClientInQueue.emit("start-chat", client_data)
                        socket.emit("start-chat", clientInqueue_data)
                    }
                }catch(error){
                    socket.emit("start-chat", {})
                }
                
            })
            //MESSAGE EVENTS
            socket.on('message', function (data) {
                socket.broadcast.to(Server_Handling.value_handle.get(socket.id, 'rooms')).emit('message', data);
            });
            // DISCONNECT EVENTS
            socket.on("disconnect", ()=>{
                this.io.emit("totalUsers", Server_Handling.totaluser('out'))
                socket.broadcast.to(Server_Handling.value_handle.get(socket.id, 'rooms')).emit('chat end');
                //CLEAN DATA EVENTS
                socket.leave(Server_Handling.value_handle.get(socket.id, 'rooms') )
                store_array.forEach(obj => {
                    Server_Handling.value_handle.remove(socket.id, obj)
                });
                Server_Handling.queueRemove(socket.id)
            })
            socket.on('leave room', function () {
                socket.broadcast.to(Server_Handling.value_handle.get(socket.id, 'rooms')).emit('chat end');
                //CLEAN DATA EVENTS
                socket.leave(Server_Handling.value_handle.get(socket.id, 'rooms'))
                store_array.forEach(obj =>{
                    Server_Handling.value_handle.remove(socket.id, obj)
                })
                Server_Handling.queueRemove(socket.id)
            });
        },)

    }
}
module.exports = SocketServices