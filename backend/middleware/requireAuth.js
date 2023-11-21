const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    //auth token is att with header
    const { authorization } = req.headers;
    // if there is no token i.e token is null
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'});
    }
    // we have header, now get token from header as header looks like something "bearer dlkjdkjf.fdkjdljf.dfjdlfj"
    const token = authorization.split(' ')[1];
    //varify the token as it may be forged
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        //confirm that subject id exist i.e user exist
        const userid = await User.findOne({_id}).select('_id');
        if (!userid){
            return res.status(401).json({error: 'User not found'})
        }
        // console.log(userid);
        req.user = userid;
        console.log(res.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Not a valid token'});
    }
}
module.exports = requireAuth;