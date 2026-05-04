const express = require('express');
const app = express();
// & Simple routing in no express js

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// How to get Qury Params 
// Hitiing URl :- http://localhost:3001/about/10
app.get("/about/:id",(req,res)=>{
    res.send(req.params);
})

app.listen(3001, () => {
    console.log('Server running on port 3000');
});