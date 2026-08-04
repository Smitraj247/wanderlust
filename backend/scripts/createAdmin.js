if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const User = require("../models/user.js");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");
}

main()
  .then(async () => {
    rl.question("Enter username: ", (username) => {
      rl.question("Enter email: ", (email) => {
        rl.question("Enter password: ", async (password) => {
          try {
            const newUser = new User({ email, username, isAdmin: true });
            await User.register(newUser, password);
            console.log("\n✅ Admin user created successfully!");
            console.log(`Username: ${username}`);
            console.log(`Email: ${email}`);
          } catch (err) {
            console.error("❌ Error creating admin:", err.message);
          }
          rl.close();
          mongoose.connection.close();
        });
      });
    });
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
