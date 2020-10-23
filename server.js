const fs = require("fs");
const { exec } = require("child_process");
const { performance } = require("perf_hooks");

const logPath = "./data/log.json";

function execute(command, callback) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout || stderr || error);
  });
}

fs.readFile(logPath, (_err, _data) => {
  if (_err) throw _err;
  let logSet_ = JSON.parse(_data);
  Object.values(logSet_).forEach((val) => {
    if (Object.keys(val.diff).length < 1) {
      exec(`cd git && git clone ${val.repo}`, (error, stdout, stderr) => {
        exec(
          `echo "timestamp:${performance.now()}\n\n${
            stdout || stderr || error
          }" >> data/files/${val.repo.split("/")[4]}.txt`
        );
      });
      val.diff.push({ clock: performance.now() });
    }
  });
  console.log("out : ", logSet_);
});
