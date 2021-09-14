import User from "../.../../../../../models/User";
import DbConnet from "../../../../lib/dbConnect";
DbConnet();
export default async (req, res) => {
    const {
        query : {userId},
        method
    } = req
    switch(method) {
        case 'GET' : 
            try {
                console.log(userId)
                const user = await User.findOne({ _id: userId })
                if(!user) {
                    return res.status(200).json({succes : true , data: "Loading"})
                }
                res.status(200).json({ succes : true , data: user}) ;
            } catch (error) {
                res.status(400).json({success: false , data: "get successs false"})
            }
            break;
        case 'DELETE':
            try {
                const user = await User.findByIdAndDelete(userId)
                res.status(200).json({success:true})
            } catch (error) {
                res.status(400).json({success: false , data: "get successs false"})
                
            }
           break 
           case 'PUT':
            try {
                const user = await User.findByIdAndUpdate(userId, req.body, {
                    new: true,
                    runValidators: true,
                })
                if(!user){
                    return 
                    res.status(400).json({succes : false})
                }

                res.status(200).json({success:true})
            } catch (error) {
                res.status(400).json({success: false , data: "get successs false"})
                
            }
           break 
        default :
            res.status(400).json({success: false ,data : "default"})
            break;

    }
}