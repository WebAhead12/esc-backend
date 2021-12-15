const express = require("express");
const router = require("./router");
const cors = require("cors");
const handleError = require("./middleware/error");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError.handleErrors);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
