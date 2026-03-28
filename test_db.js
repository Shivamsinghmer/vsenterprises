const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("SUCCESS! Connected to MongoDB.");
    process.exit(0);
  } catch (err) {
    console.error("FAILED TO CONNECT:");
    console.error(err);
    process.exit(1);
  }
}
check();
