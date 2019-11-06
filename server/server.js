const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())


app.listen(port,()=>{
    console.log(`running on http://localhost${port}`);
})