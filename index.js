const express = require("express");
const os = require("os");
const cluster = require("cluster");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

app.get("/cpu", (req, res) => {
  for (let index = 0; index < 10000000000000; index++) {
    Math.random();
  }
  return res.json({ message: "cpu worker" });
});


app.post("/webhook",async(req,res)=>{
  const {data} = await req.body;
  console.log(data);
  return res.status(200).json({message:"Done"})

})

app.get("/os", (req, res) => {
  return res.json({ message: os.platform() });
});

app.listen(3000, () => {
  console.log("server started");
});
