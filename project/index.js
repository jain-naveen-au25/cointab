let express = require('express');
let app = express();
let env = require('dotenv')
let products = require('./routes/user');
app.use(express.json())
app.use("/api/v1", products);
let port = process.env.port||8000;
app.listen(port,()=>{
  console.log(`app is running on port ${port}`)
})
