require('dotenv').config()
const express = require('express');
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express()

const tasks = require('./routes/tasks');

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening on the port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

