import { config } from "dotenv";
import express from 'express';
config();
import app from "./server"
import path from "path";
const port = 4000;

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});