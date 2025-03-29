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

    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist. Please Signup" });
    }

    if (existingUser && existingUser?.external_id) {
      return res.status(404).json({ message: "Please Sign in with Google" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).cookie("token", token, { expires: new Date(Date.now() + 604800000), httpOnly: true, sameSite: 'none', secure: true, domain: 'blog-mern-backend2.onrender.com' }).json({ result: existingUser })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong. Please Refresh" });
  }
}

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser?.external_id) {
        return res.status(400).json({ message: "User already exists. Please Sign in with Google" });
      }
      return res.status(400).json({ message: "User already exists. Please Login" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).cookie("token", token, { expires: new Date(Date.now() + 604800000), httpOnly: true, sameSite: 'none', secure: true, domain: 'blog-mern-backend2.onrender.com' }).json({ result: newUser })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong. Please Refresh" });
  }
}

export const googleSignin = async (req, res) => {

  const { tokens } = await oAuth2Client.getToken(req.body.data); // exchange code for tokens
  oAuth2Client.setCredentials({ tokens });

  const result = await verifyToken(tokens?.id_token);
  const { name, email, picture, sub, iss, email_verified } = result;

  if (email_verified) {
    const existingUser = await User.findOne({ external_id: result.sub });
    try {
      if (!existingUser) {

        const newUser = await User.create({ name, email, imgUrl: picture, external_type: iss, external_id: sub });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).cookie("token", token, { expires: new Date(Date.now() + 604800000), httpOnly: true, sameSite: 'none', secure: true, domain: 'blog-mern-backend2.onrender.com' }).json({ result: newUser })
      }
      else {
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).cookie("token", token, { expires: new Date(Date.now() + 604800000), httpOnly: true, sameSite: 'none', secure: true, domain: 'blog-mern-backend2.onrender.com' }).json({ result: existingUser })
      }
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
  else {
    return res.status(400).json({ message: "Google login failed try again" });
  }
}

export const getRefreshTokens = async (req, res) => {

  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  oAuth2Client.setCredentials({ tokens });

  res.json(credentials);
}

export const verifyToken = async (id_token) => {
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

export const signout = async (req, res) => {
  try {
    res.clearCookie('token', {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: 'blog-mern-backend2.onrender.com'
    });
    res.status(201).json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const checkUserStatus = async (req, res) => {
  res.status(200).send({ message: 'Token not expired' });
}