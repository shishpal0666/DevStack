import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);


export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser){
      return res.status(404).json({ message: "User doesn't exist. Please Signup" });
    }
    
    if(existingUser && existingUser?.external_id){
      return res.status(404).json({ message: "Please Sign in with Google"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect){
      return res.status(400).json({ message: "Invalid credentials"});
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h"});

    res.status(200).cookie.json({result: existingUser, token});

  } catch (error) {
    res.status(500).json({ message: "Something went wrong"});
  }
}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword} = req.body;

  try{
    const existingUser = await findOne({ email });

    if(existingUser){
      if(existingUser?.external_id){
        return res.status(400).json({ message: "User already exists. Please Sign in with Google" });
      }
      return res.status(400).json({ message: "User already exists. Please Login" });
    }

    if(password !== confirmPassword){
      return res.status(400).json({ message: "Password don't match"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

    //sendCookie

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h"});

    res.status(200).json({ newUser, token })
  }
  catch(error){
    res.status(500).json({ message: "Something went wrong"});
  }
}

export const googleSignin = async(req, res) => {

  const { tokens } = await oAuth2Client.getToken(req.body.response); // exchange code for tokens
  console.log(tokens);
  oAuth2Client.setCredentials({tokens});

  const result = await verifyToken(tokens?.id_token);
  const { name, email, picture, sub, iss } = result;

  const newUser = {name, email, imgUrl: picture, external_type: iss, external_id: sub };
  const createUser = User.updateOne({ external_type: result.iss, external_id: result.sub }, newUser,{ upsert: true });

  console.log(createUser);

  const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET, { expiresIn: "1h"});
  res.status(200).json({ newUser, token })
}

export const getRefreshTokens = async(req, res) => {

  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  oAuth2Client.setCredentials({tokens});

  res.json(credentials);
}

export const verifyToken = async(id_token) => {
  try {
    const result = await oAuth2Client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID,  
    });
    const payload = result.getPayload();
    return payload;
  } catch (error) {
    console.log(error);
  }
}
