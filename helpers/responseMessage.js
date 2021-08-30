const responseMessage = {
    responseEmpty : ()=>{
        return { message : 'Data is Empty', status : 404 }
    },
    responseServerError : (message)=>{
        return {message : `Error Code 500 : ${message}`, status : 500}
    },
    responseCreate : (message) =>{
        return { message : `Succes Create Data : ${message}`, status : 201}
    },
    responseBadRequest : (message) =>{
        return {message : `Bad Request : ${message}`, status : 400}
    }
}

module.exports = responseMessage