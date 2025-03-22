import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/blog', blogRoutes);
app.use('/auth', userRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(process.env.PORT, ()=> console.log(`Server is listening on port: ${process.env.PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
 