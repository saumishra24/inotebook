const jwt = require('jsonwebtoken');
const SEC_KEY = process.env.SECRET_KEY;

const fetchuser = (req, res, next) =>{
  const token = req.header('auth-token');
  if(!token){
    return res.status(401).send({error: "Access Denied"});
  }
  try {
    const data =jwt.verify(token, SEC_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({error: "Access Denied"});
  }
}

module.exports = fetchuser;