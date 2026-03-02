import "dotenv/config";
import express from "express";
npm
const app = express();

app.get("/", (req, res) => {
  res.send("Servidor rodando!\n" + process.env.MESSAGE);
});

const port = process.env.PORT ?? 3000;

app.listen(port, () =>
  console.log(
    "Example app listening on port " + port + "!\n" + process.env.MESSAGE
  )
);