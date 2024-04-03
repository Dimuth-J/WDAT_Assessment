import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

dotenv.config();

const PORT: string | number = process.env.PORT || 8000;
const app: Express = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL: string = process.env.MONGODB_URL || '';



// If the options are necessary and not recognized, you could directly cast them:
mongoose
  .connect(URL, {
    useNewUrlParser: true, // These options may no longer be necessary,
    useUnifiedTopology: true, // depending on your Mongoose version.
  } as mongoose.ConnectOptions) // This cast can suppress the error if you're sure the options are correct.
  .then(() => {
    console.log('MongoDB Connection Success! 🚀');
  })
  .catch((error: any) => {
    console.error('MongoDB Connection Error:', error);
  });

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = err.statusCode || 500;
  const message: string = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Import routes
import taskRouter from './route/taskRoute';
app.use('/task', taskRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
