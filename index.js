const express = require("express");
const os = require("os");
const cluster = require("cluster");
const { exec } = require("child_process");
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

app.post("/webhook", async (req, res) => {
  const data = await req.body;
  if (!data) {
    return res.status(408).json({ message: "No data" });
  }

  // Kill any process using port 3000 before restarting
  exec(
    "ls -al && node -v && git pull &&  pm2 restart index.js",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );

  return res.status(200).json({ message: "Done" });
});

app.get("/os", (req, res) => {
  return res.json({ message: os.platform() });
});

app.listen(3000, () => {
  console.log("server started");
});
