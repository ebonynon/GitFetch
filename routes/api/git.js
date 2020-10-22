const fs = require("fs");
const express = require("express");

const dataPath = "./data/list.json";
const router = express.Router();

router.post("/", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) throw err;

    let _data = JSON.parse(data);

    _data.push(req.body);

    fs.writeFile(dataPath, JSON.stringify(_data, null, 2), (err) => {
      if (err)
        throw (err, res.status(400).json({ error: "Unable to add this repo" }));
      res.json({ msg: "Repo added successfully" });
      console.log("Data written to file");
    });
  });
});

module.exports = router;
