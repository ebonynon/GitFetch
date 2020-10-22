const express = require("express");

const git = require("./routes/api/git");

const app = express();

app.get("/", (req, res) => res.send("Welcome to GitOps"));

app.use("/api/git", git);

const port = process.env.PORT || 8088;

app.listen(port, () => console.log(`Server running on port ${port}`));
