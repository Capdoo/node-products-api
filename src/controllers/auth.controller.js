import jwt from "jsonwebtoken"
import config  from "../config";

import Role from "../models/Role";
import User from "../models/User";

export const signUp = async (req, res) => {
    const {username, email, password, roles} = req.body;

    //const userFound = User.find({email});

    const registerUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)

    });

    if (roles){
        const foundRoles = await Role.find({name: {$in: roles}});     
        registerUser.roles = foundRoles.map( role => role._id);
    }else{
        const role = await Role.findOne({name: "user"});
        registerUser.roles = [role._id];
    }

    const saveUser = await registerUser.save();
    
    const token = jwt.sign({id: saveUser._id}, config.SECRET, {
        expiresIn: 86400 //24h
    });

    res.status(200).json({token: token, user: saveUser});

};


export const signIn = async (req, res) => {
    const {username, email, password} = req.body;
    const userFound = await User.findOne({email: req.body.email}).populate("roles");
    if (!userFound) {
        res.status(400).json({message:"User not found"});
    }

    const matchPasword = await User.comparePassword(password, userFound.password);

    if (!matchPasword){
        res.status(401).json({token: null, message: "Invalid fields"});
    }

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    });

    console.log(userFound);

    res.json({token: token});
};
















