require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
require('./model/conn');
const router = require('./controller/router');
const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());
app.use("/api",router);
// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port,() => console.log(`Server is running at port no ${port}.`));