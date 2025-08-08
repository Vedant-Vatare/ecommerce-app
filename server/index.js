import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import rootRouter from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', rootRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('Server is running on port ' + process.env.PORT);
});
