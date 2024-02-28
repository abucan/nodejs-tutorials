const express = require('express')
const path = require('path')

const {products} = require('./data')

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>home page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {
            id,
            name,
            image
        }
    })
    res.json(newProducts)
})

app.get('/api/products/:productId', (req, res) => {
    const {productId} = req.params
    const singleProduct = products.find((product) => product.id.toString() === productId)
    if(!singleProduct) {
        return res.status(404).send("there is no product with that ID")
    }
    res.json(singleProduct)
})

app.get('/api/v1/query', (req, res) => {
    const {search, limit} = req.query
    let sortedProducts = [...products]
    if(search) {
        sortedProducts = sortedProducts.filter((product) => product.name.startsWith(search))
    }
    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit))
    }
    if(sortedProducts.length < 1) {
        return res.status(200).json({success: true, data: []})
    }
    return res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
    res.status(404).send('cannot get page')
})

app.listen(5000, () => {
    console.log(`Sever is listening on the port 5000`)
})