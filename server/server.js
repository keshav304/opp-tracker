import express from 'express';
import  bodyParser from 'body-parser';
import  mongoose from 'mongoose';
import  morgan from 'morgan'
import  cors from 'cors';
import  dotenv from 'dotenv';
import authRoutes from './routes/auth.js' ;
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();


// app middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


if(process.env.NODE_ENV='development'){
    app.use(cors({origin:`${process.env.CLIENT_URL}`}));
}


//middleware
app.use('/api', authRoutes); 
app.use('/api',userRoutes)



const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT|| 8000;



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on PORT: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);