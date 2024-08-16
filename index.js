import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app=express();
const port=3000;
app.use(express.json());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.post("/get", async (req,res)=>{
    const amount=req.body.amt;
    const value=req.body.curr1;
    const code=req.body.curr2;

    try {
        const response= await axios.get("https://v6.exchangerate-api.com/v6/115bd95ace7825b551fbc434/latest/"+value);
        const result1=response.data;
        const result2=result1.conversion_rates[code];
        const result3=result2*amount;
        console.log(result3);
        res.render("index.ejs",{content:result3});
        
    } catch (error) {
        res.status(404).send(error.message);
        
    }
});
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
});