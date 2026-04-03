const mongoose = require('mongoose');

const uri = "mongodb+srv://pratapsing5656_db_user:9CWLVFDcutsea31a@cluster0.i4oiagv.mongodb.net/PORTFOLIO?appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });
