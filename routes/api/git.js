const fs = require("fs");
const express = require("express");

const dataPath = "./data/list.json";
const logPath = "./data/log.json";
const router = express.Router();

router.post("/", (req, res) => {
  fs.readFile(dataPath, (err, data) => {
    if (err) throw err;

    let _data = JSON.parse(data);
    f(req);
    _data.push(req.body);

    fs.writeFile(dataPath, JSON.stringify(_data, null, 2), (err) => {
      if (err)
        throw (err, res.status(400).json({ error: "Unable to add this repo" }));
      res.json({ msg: "Repo added successfully" });
      console.log("Data written to file");
    });
  });
});

function f(req) {
  fs.readFile(logPath, (_err, _data) => {
    if (_err) throw err;

    let logSet_ = JSON.parse(_data);

    let q = {
      repo: req.body.repo,
      stime: req.body.time * 60000,
      diff: [],
    };

    logSet_.push(q);

    fs.writeFileSync(logPath, JSON.stringify(logSet_, null, 2), (werr) => {
      if (werr) throw werr;
      console.log("logSet_ written to file");
    });
  });
}

module.exports = router;
