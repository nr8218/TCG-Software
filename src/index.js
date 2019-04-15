const express = require('express')
require('./db/mongoosedb')
const indexRouter = require('./routers/index')
const userRouter = require('./routers/users')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(indexRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '.')
})