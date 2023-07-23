const jwt = require('jsonwebtoken')
const {secret} = require('../config')


module.exports = (req,res,next) =>{
        if(req.method === 'OPTION'){
            next()
        }
        try{
            const token = req.headers.authorization?.split(' ')[1]
            if(!token){
                return res.status(403).json({message:'user not registered'})
            }
            const decodedData = jwt.verify(token,secret)
            req.user = decodedData
            next()
        }catch (e) {
            console.log(e)
            return res.status(403).json({message:'user not registered'})
        }
}