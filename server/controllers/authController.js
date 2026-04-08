
import { loginUser, logoutUser, refreshAccessToken, registerTeacher, registerUser, updateUserProfile } from "../services/authService.js";
//POST api/auth/register

const isProduction = process.env.NODE_ENV === 'production';

export const register = async (req, res, next) =>{
    try{
        const {name, email, password} = req.body;

        const {user, accessToken, refreshToken} = await registerUser(name, email, password);
    

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully",
            user, 
        });
    } catch (err){
        next(err);
    }

}

//POST api/auth/login
export const login = async (req, res, next) =>{
    try{
        const {email, password} = req.body;

        const {user, accessToken, refreshToken} = await loginUser(email, password);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User logged_in successfully",
            user, 
        });
    } catch (err){
        next(err);
    }
}

//GET api/auth/me
export const profile = (req, res) =>{
   res.status(200).json({user: req.user});
}

// PATCH /api/auth/me
export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id; // assuming req.user is set by your auth middleware
        const updatedUser = await updateUserProfile(userId, req.body);

        // Remove sensitive fields before sending response
        const { password_hash, ...safeUser } = updatedUser;

        res.status(200).json({
            message: "Profile updated successfully",
            user: safeUser
        });
    } catch (err) {
        next(err);
    }
};

//POST /api/auth/register teacher
export const registerTeacherAccount = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
     
        await registerTeacher(name, email, password);

        res.status(201).json({"message": "Teacher account successfully created"});
        
    } catch (err) {
        next(err);
    }
    
}

//POST api/auth/refresh
export const refresh = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token){
            return res.status(401).send({message: "No token is present"});
        }

        const {accessToken} = await refreshAccessToken(token);
        
        return res.status(200).json({accessToken});

    } catch (err) {
        next(err);
    }
}

//POST /api/auth/logout
export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        if(!token){
            return res.status(401).send({message: "No token is found"});
        }

        await logoutUser(token);
        
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: "strict",
        };

        res.clearCookie("refreshToken", cookieOptions);
        res.clearCookie("accessToken", cookieOptions);
        return res.status(200).json({message: "User Logged out successfully.."})
        
    } catch (err) {
        next(err);
    }
}