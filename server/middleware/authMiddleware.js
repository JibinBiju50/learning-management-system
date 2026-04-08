import {findById} from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config/env.js'

//middleware function to validate user before reaching the controller
export const protect = async (req, res, next) => {
    //Extract token from cookies
    const token = req.cookies.accessToken;

    //return if token is not found
    if(!token){
        return res.status(401).json({message: "No token is provided.."})
    }

    try {

        //Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
 
       //find the user from the database if the token matches
       const {password_hash, ...safeUser} = await findById(decoded.id);
     
       //checks whether the user still exists
        if(!safeUser){
           return res.status(401).json({message: "User no longer exist.."})
        }

        //attach the user information to the req
        req.user = safeUser;

        //control is passed to next middleware or controller
        next();
        } catch (error) {
        return res.status(401).json({"message": "Invalid or expired token"});
        }
}

//middleware function to allow access to users based on their roles
export const authorize = (...roles) => (req, res, next) =>{
    //if role is not present, then don't authorize 
    if(!roles.includes(req.user.role)){
        return res.status(403).json({
            message: "You don't have permission to perform this action"
        });
    }
    next()
}

