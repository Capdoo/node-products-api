import jwt from "jsonwebtoken";
import config from "../config";

//models
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(404).json({message: "No token provided"});
    
        const decoded = jwt.verify(token, config.SECRET);
        //To be used in others middlewares
        req.userId = decoded.id;
        //console.log(decoded);
    
        //check user
        //IDK password = 0
        const user = await User.findById(decoded.id, {password: 0});
        //console.log(user);
        if (!user) return res.status(404).json({message: "No user found"});
    
        next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"}); 
    }
};

//All functions have the same req body
export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    const check = (await roles).some( value => value.name === "admin");
    if (!check) return res.status(403).json({message: "Requer Admin Role"});
    next()
}


export const isSuperadmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in: user.roles}});
    const check = (await roles).some( value => value.name === "superadmin");
    if (!check) return res.status(403).json({message: "Requer SuperAdmin Role"});
    next()
}