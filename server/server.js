require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const jobsRoutes = require('./routes/jobs');
const companyRoutes = require('./routes/company');
const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');
const globalRoutes = require('./routes/global');
const curriculumRoutes = require('./routes/curriculum');
const categoryRoutes = require('./routes/category');


const path = require('path');

const PORT = process.env.PORT || 5001;

console.log(process.env.NODE_ENV);

connectDB();

app.use(cors());

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

/* app.use('/', express.static(path.join(__dirname, 'public')));
 */

app.use('/jobs', jobsRoutes);
app.use('/category', categoryRoutes);
app.use('/company', companyRoutes);
app.use('/client', clientRoutes);
app.use('/admin', adminRoutes);
app.use('/login', globalRoutes);
app.use('/curriculum', curriculumRoutes);


app.use('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 not found');
  }
});

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log('NOT CONNECTED TO NETWORK', err));

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
