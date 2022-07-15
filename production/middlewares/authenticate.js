module.exports.isAuthorized  = function(req, res, next) {

    if(req.session.userID){
        next();
    }
    else{
        return res.status(401).json({"message": "Unauthorized"});
    }
}