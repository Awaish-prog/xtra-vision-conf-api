import { config } from "dotenv";
config();
import app from "./server"
const port = parseInt(process.env.PORT as string) || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});