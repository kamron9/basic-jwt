const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')


const generateAccessToken = (id,roles)=>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret,{expiresIn: '24h'})
}


class AuthController {
    // register
    async register(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:'registration error', errors})
            }
            const {username,password} = req.body
            let condidate = await User.findOne({username})
            if(condidate){
               return  res.status(400).json({message:'user already registered'})
            }
            const hashPassword = bcrypt.hashSync(password,7)
            const userRole = await Role.findOne({value:"USER"})
            const user = new User({username,password:hashPassword,role:[userRole.value]})
            await user.save()
            return res.json({message:'user successfully added'})
        }catch (e) {
            console.log(e)
           return  res.status(400).json('register error')
        }
    }
    // login
    async login(req,res){
        try{
            const {username,password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({message:`${username} not found, pleace register`})
            }
            const validPassword =  bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return res.status(400).json({message:'incorrect password'})
            }
            const token = generateAccessToken(user._id,user.roles)
            return res.json({token})
        }catch (e) {
            console.log(e)
           return  res.status(400).json({message:`login error ${e}`})
        }
    }
    async getUser(req,res){
        try{
            const users =  await User.find()
            res.json(users)
        }catch (e) {

        }
    }
}

module.exports = new AuthController()