import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async(req, res, next) => {
  const { token } = req.cookies;
  
  if(!token) {
    return res.status(401).json({ message: "Please Login to access." });
  }

  try { 
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}

export default auth;