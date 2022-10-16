const express = require('express');
const user = require('./routes/User');
const car = require('./routes/Car');


const app = express();
const port = 8000;

app.use(express.json());
app.use('/users',user);
app.use('/cars',car)


app.listen(port, () => {
    console.log(`App starting on ${port}`);
})