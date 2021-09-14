import User from "../.../../../../../models/User";
import DbConnet from "../../../../lib/dbConnect";
import bcrypt from 'bcryptjs'

DbConnet();
export default async (req, res) => {
    const {method,
    } = req;
    switch(method ) {
        case "GET" :
            try {
                const user = await User.find({})
                if(!user) {
                    return res.status(200).json({succes : true , data: "Loading"})
                }
                res.status(200).json({ succes : true , data: user}) ;
                
            } catch (error) {
                console.log(error)
                res.status(400).json({success : false , data: "fuuuuuu"})
            }
            break;

        case 'POST' : 
            try {
                const {email , password} = req.body
                const newUser = new User({
                    email,
                    password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async(err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        const result = await User.create(newUser)
                        res.status(200).json({ succes : true , data: result}) ;
                    })
                })

            } catch (error) {
                console.log(error)
                var data = '';
                if(error.keyValue) {
                    data = ` Title - ${error.keyValue.title}, already taken, Choose another title`
                }
                res.status(400).json({success : false ,  data : data})
            }
            break;
        default:
            res.status(400).json({success : false})
            break;
    }
} 



