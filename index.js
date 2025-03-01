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

app.get("/os", (req, res) => {
  return res.json({ message: os.platform() });
});

if (cluster.isPrimary) {
  for (let index = 0; index < os.cpus().length; index++) {
    cluster.fork();
  }
} else {


  app.listen(3000,()=>{
    console.log('server started')
  });
}
