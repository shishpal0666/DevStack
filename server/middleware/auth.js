import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
  try {
    const { token } = req.cookies;

    if(!token) {
      return res.status(401).json({ message: "Please Login to access." });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();

  } catch (error) {
    console.log(error);
  }
}

export default auth;