const User=require('../models/User');

//Register
exports.register=async(req,res)=>{
    console.log(req.body);
    try {
        const {username,email}=req.body;
        
        const user=await User.findOne({email});
        if(user){
            return res.json({status:"success",message:user.userID})
        }
        else{
            let userID="";
            const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            while(true){
                for(let i=0;i<10;i++){
                    userID+=chars.charAt(Math.floor(Math.random()*chars.length));
                }
                const exists=await User.findOne({userID});
                if(!exists) break;
                userID="";
            }
            const newUser=new User({username,email,userID});
            await newUser.save();
            return res.json({status:"success",message:userID})
        }
    } catch (error) {

        return res.json({status:"false",message:"network"})
    }
}

//Get Details
exports.getDetails=async(req,res)=>{
    try {
        const {userID}=req.params;
        const user=await User.findOne({userID});
        // console.log(user);
        if(!user) return res.json({status:"false",message:"user not found"})
        else return res.json({status:"success",message:user})
    } catch (error) {
        return res.json({status:"false",message:"network Error"})}
}

exports.userlist= async (req, res) => {
    try {
      const users = await User.find({}, { userID: 1, username: 1, email: 1 });
      return res.json({status:"success",message:users})
    } catch (error) {}
        return res.json({status:"false",message:"network Error"})}
  