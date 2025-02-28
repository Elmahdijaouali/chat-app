import Alpha from "./doc";

function encryption ( message ){
    return new Promise((resolve , reject ) => {
        let output = ""; 

        for (let item of message) {
            if (item in Alpha) {
                output += Alpha[item];
            } else if (item === " ") {
                output += "o"; 
            } 
        }
    
        return resolve(output) ; 
    })
   
}


export default encryption  ; 