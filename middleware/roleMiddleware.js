const jwt = require('jsonwebtoken')
const {secret} = require('../config')


module.exports = (roles) =>{

    return function (req,res,next){
        if(req.method === 'OPTION'){
            next()
        }
        try{
            const token = req.headers.authorization?.split(' ')[1]
            if(!token){
                return res.status(403).json({message:'user not registered'})
            }
            const {roles: userRole } = jwt.verify(token,secret)
            let hasRole = false

            userRole?.forEach(role=>{
                if(roles.includes(role)){
                    hasRole = true
                }
            })
            if(!hasRole){
                return res.status(403).json({message:'your cannot access to this data'})
            }
            next()
        }catch (e) {
            console.log(e)
            return res.status(403).json({message:'user not registered'})
        }
    }


}