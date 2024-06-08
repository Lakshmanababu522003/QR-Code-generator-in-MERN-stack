const router=require('express').Router();
const {register, getDetails , userlist}=require('../controllers/pubCon');

//Register
router.post('/api/register',register);


//Get Details
router.get('/getdetails/:userID',getDetails);

// Add a new route to fetch all users
router.get('/api/users', userlist);

module.exports=router;


   
  