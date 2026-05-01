const http = require("http");
const Fs = require("fs");
const url = require("url");
const { json } = require("stream/consumers");
const { NONAME } = require("dns");

const replaceTemplate = (temp,product) => {
    let out = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    out = out.replace(/{%IMAGE%}/g,product.image)
    out = out.replace(/{%PRICE%}/g,product.price)
    out = out.replace(/{%FROM%}/g,product.from)
    out = out.replace(/{%NUTRIENTS%}/g,product.nutrients)
    out = out.replace(/{%QUANTITY%}/g,product.quantity)
    out = out.replace(/{%DESCRIPTION%}/g,product.descripiton)
    out = out.replace(/{%ID}/g,product.id)

    !product.organic ? out = out.replace(/{%NOT_ORGANIC%}/g,'not-organic') : ""
     
    return out;
}
const productsOVerview  =   Fs.readFileSync(`${__dirname}/products.html`,"utf-8");
const card = Fs.readFileSync(`${__dirname}/card.html`,"utf-8");
const Dataobj = Fs.readFileSync(`${__dirname}/data/data.json` , "utf-8");
const data = JSON.parse(Dataobj);


const server = http.createServer((req,res)=>{

    const path = req.url

    if(path === "/"){
        res.writeHead(200,{"content-type":"text/html"});
        
        const cardsHtml = data.map(el => replaceTemplate(card , el));
        console.log(cardsHtml);
        const output = productsOVerview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        console.log(output);
        
        res.end(output);
    }else{
        res.end("<h1>Not Found</h1>");
    }
})

server.listen(3001,()=>{
    console.log("server is listing at port"+ 3001);
})