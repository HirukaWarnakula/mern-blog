import User from "../models/user.model.js";
import bcryptjs from 'bcrypt';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res,next) => {
   
  const { username, email, password } = req.body;

  if(!username || !email || !password || username === '' || email === ''|| password === ''){
   next(errorHandler(400,'All fields are required'));
  }
  const hashedPassword = await bcryptjs.hash(password,10);

  const newUser = new User({
    username,
    email, 
    password:hashedPassword,
 });

 try{
    await newUser.save();
    res.json( "Signup successful");

 }catch(error){
    next(error);
 }  

 
};

export const signin = async (req, res,next) => {

   const { email, password } = req.body;
   
   if(!email || !password || email === '' || password === ''){
    next(errorHandler(400,'All fields are required'));
   }
   
   try{
      const ValidUser = await User.findOne({email});
      if(!ValidUser){
         return next(errorHandler(404,'IUser not found'));
      }
      const ValidPassword =bcryptjs.compareSync(password,ValidUser.password); 
      if(!ValidPassword){
          return next(errorHandler(400,'Invalid password'));
      }

      const token = jwt.sign(
         {id:ValidUser._id,isAdmin:ValidUser},process.env.JWT_SECRET);
   
         const {password: pass, ...rest} =ValidUser._doc;

         res.status(200).cookie('access_token',token,{
            httpOnly:true,
         }).json(rest);

}catch(error){

   next(error);

 }

};

export const google = async (req, res, next) => {
   const { email, name, googlePhotoUrl } = req.body;

   try {
      const user = await User.findOne({ email });
      if (user) {
         const token = jwt.sign({ id: user._id,isAdmin:user.isAdmin }, process.env.JWT_SECRET);
         const { password, ...rest } = user._doc;
         res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS
            sameSite: 'Strict', // Helps mitigate CSRF attacks
         }).json(rest);
      } else {
         const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

         let username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4);
         while (await User.findOne({ username })) {
            username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4);
         }

         const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePicture: googlePhotoUrl,
         });
         await newUser.save();
         const token = jwt.sign({ id: newUser._id,isAdmin:newUser.isAdmin }, process.env.JWT_SECRET);
         const { password, ...rest } = newUser._doc;
         res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
         }).json(rest);
      }
   } catch (error) {
      next(error);
   }
};


 