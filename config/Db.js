const mongoose = require('mongoose')



const SetUpDb = async () =>{
    try{
     const connect = await mongoose.connect(`mongodb+srv://NaveenEmployeeTask:${process.env.MONGODBPWD}@employeetask.u2kwitq.mongodb.net/?retryWrites=true&w=majority&appName=EmployeeTask`)
     if(connect){
        console.log('Connected to the DataBase')
     }else{
        console.log('Err')
     }
    }
    catch(err){
        console.log(err)
    }
}



module.exports = SetUpDb