const fs = require("fs");
const { exec } = require("child_process");

const logPath = "./data/log.json";

function loop() {
  let unixTime = Math.floor(Date.now() / 1000);

  fs.readFile(logPath, (_err, _data) => {
    if (_err) throw _err;

    let logSet_ = JSON.parse(_data);

    Object.values(logSet_).forEach((val) => {
      if (Object.keys(val.diff).length < 1) {
        exec(
          `cd git && git clone ${val.repo} && git diff @{1}..`,
          (error, stdout, stderr) => {
            exec(
              `echo "timestamp:${unixTime}\n\n${
                stdout || stderr || error
              }" >> data/files/${val.repo.split("/")[4]}.txt`
            );
          }
        );

        val.diff.push({ clock: unixTime });
      } else {
        if (
          unixTime -
            Object.values(val.diff)[Object.keys(val.diff).length - 1].clock >=
          val.stime
        ) {
          exec(
            `cd git/${val.repo.split("/")[4]} && git pull origin master`,
            (error, stdout, stderr) => {
              exec(
                `echo "timestamp:${unixTime}\n\n${
                  stdout || stderr || error
                }" >> data/files/${val.repo.split("/")[4]}.txt`
              );
            }
          );

          val.diff.push({ clock: unixTime });
        }
      }
    });

    fs.writeFileSync(logPath, JSON.stringify(logSet_, null, 2), (werr) => {
      if (werr) throw werr;
      console.log("logSet_ written to file");
    });
  });
}
setInterval(loop, 60000);
