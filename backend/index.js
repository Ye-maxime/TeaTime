require('dotenv').config();
const { app } = require('./server')

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API server started on ${port}`))
