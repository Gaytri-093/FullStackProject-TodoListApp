const express = require('express');
const port = 2000;
const app = express();
const cors = require('cors');
require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello welcome");
});

//Register
app.use("/api/v1",auth);
app.use("/api/v2",list);



app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
})