const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    const date = new Date()
    const pwd = process.env.PWD
    res.send({
        date,
        pwd
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})