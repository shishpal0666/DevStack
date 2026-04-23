import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import blogRoutes from './routes/blogs.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({limit: "10mb"}));
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({limit: '10mb', extended: true}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use('/blog', blogRoutes);
app.use('/auth', userRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(`${error} did not connect`));

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, ()=> console.log(`Server is listening on port: ${port}`))
}

export default app;
