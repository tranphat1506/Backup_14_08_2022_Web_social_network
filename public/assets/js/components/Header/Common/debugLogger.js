var development = true;

export const Logger = {
    warn : (message) =>{
        if (development){
            console.warn(message)
        }
    },
    error : (message) =>{
        if (development){
            console.error(message)
        }
    },
    info : (message) =>{
        if (development){
            console.info(message)
        }
    } 
}