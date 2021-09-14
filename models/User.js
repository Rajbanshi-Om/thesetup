const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,  
    },
    email : {
        type  : String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        unique: false,
        required:true
    },
    image:{
        type : String,
    }
},
{

    timestamps : true
}  

)

module.exports = mongoose.models.Userr || mongoose.model('Userr' , UserSchema )