require('dotenv').config()
require('express-async-errors')

const express = require('express')

const app = express()

const notFound = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products Routes</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFound)
app.use(errorMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connect to db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server is listening on the port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()