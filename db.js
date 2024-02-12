// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sharma04anamika:OeGLhdKnzHbdnOJX@cluster0.g4ymeu6.mongodb.net/Marketplace?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;

