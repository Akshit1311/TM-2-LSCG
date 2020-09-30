const express = require("express");
const fileUpload = require("express-fileupload");
//Python
const spawn = require("child_process").spawn;

const path = require("path");

const app = express();

// Running Python
// let { PythonShell } = require("python-shell");

app.use(fileUpload());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }

  const file = req.files.file;

  // file.mv(`${__dirname}/client/public/uploads/${file.name}.xlsx`

  file.mv(`${__dirname}/DataSets/Dummy_data_testing.xlsx`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    // const process = spawn("python", ["./python/Transaction_Monitoring.py"]);
    //  const process = spawn("python", ["./python/Transaction_Monitoring.py"])

    const pythonProcess = spawn("python", ["TMmodel.py"]);

    pythonProcess.stdout.on("data", (data) => {
      // Do something with the data returned from python script
      console.log(data.toString());
    });

    //Working

    // PythonShell.run(
    //   "Transaction_Monitoring.py",
    //   { pythonOptions: ["-u"] },
    //   function (err) {
    //     console.log("finished");
    //     if (err) throw err;
    //   }
    // );

    // Testing
    // pyshell.end(function (err, code, signal) {
    //   if (err) throw err;
    //   console.log("The exit code was: " + code);
    //   console.log("The exit signal was: " + signal);
    //   console.log("finished");
    // });

    // process.stdout.on("data", (data) => {
    //   console.log(data.toString());
    // });

    res.json({
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
      isUploaded: true,
    });
  });
});

// app.post("/result", (req, res) => {});

app.listen(5000, () => console.log("Server started successfully!"));
