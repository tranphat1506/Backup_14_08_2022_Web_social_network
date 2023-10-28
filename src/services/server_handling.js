var totalUsers = 0
var queue = [] // on queue
var rooms = {}
var allUsers = {}
var userInfo = {}
const objdefine = {
    'rooms' : rooms,
    'allUsers' : allUsers,
    'userInfo': userInfo,
    'queue' : queue,
}
const Server_Handling = {
    totaluser: function (mode = 'out'){
        mode === 'out' ? totalUsers-- : totalUsers++;
        console.log(totalUsers)
        return totalUsers;
    },
    //GET STRANGER FUNCTION
    getstranger : function (socket, client){
        // CLIENT INFORMATION
        const client_id = client._id
        const client_name = client.name
        const client_age = client.age
        const client_gender = client.gender
        //-----------------------------------------
        //                 CHECK QUEUE IS NOT EMPTY!
        console.log(queue.length)
        if (queue.length > 0){
            var ClientInQueue = queue.pop()
            var room = socket.id + "#" + ClientInQueue.id; //socket id
            ClientInQueueID = ClientInQueue.id //socket id
            // register room for them
            rooms[ClientInQueue.id] = room
            rooms[socket.id] = room;
            // CLIENT OBJECT
            let clientInqueue_data = {'name': userInfo[ClientInQueueID].name, 'age': userInfo[ClientInQueueID].age,
             'gender': userInfo[ClientInQueueID].gender, 'room': room, 'id': userInfo[ClientInQueueID]._id }
            let client_data = {'name': client_name, 'age': client_age, 'gender': client_gender, 'room': room , 'id': client_id }
            // return value to server
            return { room,client_data,clientInqueue_data, ClientInQueue }
        }else{
            queue.push(socket)
            return false;
        }
        //-------------------------------------------------------
    },
    value_handle: {
        get: (id, obj)=>{
            let store = objdefine[obj]
            return typeof store === typeof objdefine ? store[id] : queue;
        },
        remove: (id, obj)=>{
            let store = objdefine[obj]
            delete store[id]; 
        },
        add: (id, obj, value)=>{
            let store = objdefine[obj]
            // Get and add the value
            store[id] = value;
        },
    },
    queueRemove : function (id){
        queue = queue.filter(function(e) { return e.id !== id})
    }
}

module.exports = Server_Handling;