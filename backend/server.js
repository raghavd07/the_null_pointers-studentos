const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/analyze-student', require('./routes/analyze'));
app.use('/generate-plan', require('./routes/plan'));
app.use('/predict-risk', require('./routes/risk'));
app.use('/chat', require('./routes/chat'));

app.get('/', (req, res) => {
  res.json({ message: 'StudentOS API is running 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));