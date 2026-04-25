import express from 'express'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js';
import courseRoute from './routes/courseRoute.js'
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//create an instance for express application
const app = express();

//enable cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//parse incoming JSON request
app.use(express.json());

//parse incoming cookies from req
app.use(cookieParser());

//Mount auth routes
app.use('/api/auth', authRoute);

//Mount user routes
app.use('/api/users', userRoute);

app.use('/api/courses', courseRoute);

//Error handler middleware
app.use(errorHandler);

export default app;