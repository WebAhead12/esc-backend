const express = require("express");
const router = require("./router");
const cors = require("cors");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
