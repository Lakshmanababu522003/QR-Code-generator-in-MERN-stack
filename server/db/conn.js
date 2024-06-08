const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-qrcode')
  .then(() => {
    console.log('Connected to the database');
    // Do something after successful connection
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    // Handle the connection error
  });