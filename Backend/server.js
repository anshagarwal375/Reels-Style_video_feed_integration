require('dotenv').config(); // Load env variables first
const app = require('./src/app');
const connectdb = require("./src/db/db");

connectdb();

app.listen(3000, () => {
  console.log("server started at port 3000");
});
