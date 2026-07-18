require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret length:", process.env.CLOUDINARY_API_SECRET?.length, "chars");
console.log("API Secret first 4 chars:", process.env.CLOUDINARY_API_SECRET?.substring(0, 4));

// Test API ping
cloudinary.api.ping()
  .then(result => {
    console.log("\n✅ Cloudinary connection SUCCESSFUL:", result);
  })
  .catch(err => {
    console.error("\n❌ Cloudinary connection FAILED:", err.message || err);
  });
