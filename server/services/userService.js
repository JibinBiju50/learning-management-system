import { activateUserInDB, deactivateUserInDB, findById, getAllUsers } from "../models/userModel.js"

//called when admin wants to get All user details
export const getUsers = async () => {  
    const users = await getAllUsers();
    return users;    
}

//called when admin change the status of a user to "inactive"
export const deactivateUser = async (userId) => {

        if(!userId){
            const error = new Error ("User id is required");
            error.status = 400;
            throw error;
        }

        const existingUser = await findById(userId);

        if(!existingUser){
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        if(existingUser.status === 'inactive'){
            const error = new Error("User is already inactive");
            error.status = 409;
            throw error;
        }

        const user = await deactivateUserInDB(userId);

        if(!user){
            const error = new Error ("User not found");
            error.status = 404;
            throw error;
        }
        return user;
    } 

//called when admin change the status of a user to "active"
export const activateUser = async (userId) => {

        if(!userId){
            const error = new Error ("User id is required");
            error.status = 400;
            throw error;
        }

        const existingUser = await findById(userId);

        if(!existingUser){
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        if(existingUser.status === 'active'){
            const error = new Error("User is already active");
            error.status = 409;
            throw error;
        }

        const user = await activateUserInDB(userId);

        if(!user){
            const error = new Error ("User not found");
            error.status = 404;
            throw error;
        }
        return user;
    } 