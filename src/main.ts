import * as dotenv from 'dotenv';
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import bodyParser from "body-parser";
import createHttpError from 'http-errors';
import http from 'http';

dotenv.config();

const app = express();


app.use(cors({
    origin: "",
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  }));


app.use(bodyParser.json());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static('dist'));

app.get('/', (_req: Request, res: Response) => {
  res.send("Server is running...'/'");
});



app.use(() => {
  throw createHttpError(404, 'Routes not found');
});

// Global error handling middleware
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const server = http.createServer(app);
const port = process.env.PORT!;


(
    async()=>{
        try {
            server.listen(port,()=>{
                console.log("Server is running,,,")
            });
        } catch (error) {
            console.error('Server failed to start', error);
            throw new Error('Server failed to start')
        }
    }
)();