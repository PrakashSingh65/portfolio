require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is not defined in environment variables (.env)");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Connection error:", err.message || err);
    process.exit(1);
  });

