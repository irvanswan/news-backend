const Validation = {
    isFilled : (req, res, next)=>{
       if(req.rows.length > 0){
            return true;
        }
        return false;
    }
}

module.exports = Validation