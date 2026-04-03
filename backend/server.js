const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB=require('./config/db');
dotenv.config();
connectDB();
const app=express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'StudentOS API is running' });
});
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));