if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('view', __dirname + '/views');

// Set up DB connection
const mongoose  = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use(express.json());

const uploadRouter = require('./routes/uploads');
app.use('/uploads', uploadRouter);

app.listen(PORT, () => console.log('Server is running on port ' + PORT));