const express = require('express')
const cors = require('cors')
const app = express()
const port =process.env.PORT || 5500

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Car Server is running.......')
})
app.listen(port, ()=>{
    console.log(`Car Server is Running on port ${port}`)
})