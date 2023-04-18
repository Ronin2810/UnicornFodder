const session = require('express-session')
const cookieParser = require('cookie-parser')

const authenticate = (req,res,next)=>{
    if(req.session.isAuth){
        next();
    }
    else{
        res.redirect('/investorlog')
    }
}

module.exports = authenticate