import jwt from 'jsonwebtoken';
//Check if user is authenticated by verifing jwt returned in the request header
// if verification is successful set request.isAuthenticated = true and
// request.userId to the _id of the user
// else set request.isAuthenticated = false

export default function checkUserAuthenticated(req,res) {
   const authHeader = req.headers.authorization;
   if(!authHeader){
       req.isAuthenticated = false;
       return res.status(401).json({ message: 'Not authorize' });
   }
   const token = authHeader.split(' ')[1];
   let decodedToken;

   try{
       decodedToken = jwt.verify(token, 'c559b883-cae9-4039-8029-3ced8f27df89');
   }catch(err){
       req.isAuthenticated = false;
       return res.status(401).json({ message: 'Not authorize' });
   }

   if(!decodedToken){
       req.isAuthenticated = false;
       return res.status(401).json({ message: 'Not authorize' });
   }

   req.uID = decodedToken.uID;
   req.isAuthenticated = true;
};