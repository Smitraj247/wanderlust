if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const User = require("./models/user.js");

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  const newAdmin = new User({
    email: "admin2@gmail.com",
    username: "admin2", // include if your schema uses username too
    role: "admin",
    isAdmin: true,
  });

  const registeredUser = await User.register(newAdmin, "admin123");
  console.log("Admin created:", registeredUser);
  mongoose.connection.close();
}

main().catch(console.error);
