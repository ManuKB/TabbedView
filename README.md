Here’s a **simple REST API** in **Node.js** using **Express.js** and connecting it to an **SQLite database** with **Sequelize (ORM)**.

---

## **🔹 Step 1: Initialize the Project**
```sh
mkdir node-sqlite-api && cd node-sqlite-api
npm init -y
```

## **🔹 Step 2: Install Dependencies**
```sh
npm install express sqlite3 sequelize body-parser cors
```

---

## **🔹 Step 3: Create SQLite Database Connection (`db.js`)**
```javascript
const { Sequelize, DataTypes } = require("sequelize");

// Connect to SQLite (Creates database if not exists)
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
    logging: false,
});

// Define a Model (Example: Users)
const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

// Sync Database
sequelize.sync().then(() => {
    console.log("Database & tables created!");
});

module.exports = { sequelize, User };
```

---

## **🔹 Step 4: Create REST API (`server.js`)**
```javascript
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { User } = require("./db");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ➤ 1️⃣ Create User (POST)
app.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ➤ 2️⃣ Get All Users (GET)
app.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// ➤ 3️⃣ Get User by ID (GET)
app.get("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

// ➤ 4️⃣ Update User (PUT)
app.put("/users/:id", async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
        user.name = name;
        user.email = email;
        await user.save();
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// ➤ 5️⃣ Delete User (DELETE)
app.delete("/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.json({ message: "User deleted" });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## **🔹 Step 5: Run the Server**
```sh
node server.js
```
Your API will be available at **http://localhost:3000** 🚀

---

## **🔹 Step 6: Test API (Using cURL or Postman)**

### **Create a User**
```sh
curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d '{"name": "Alice", "email": "alice@example.com"}'
```

### **Get All Users**
```sh
curl -X GET "http://localhost:3000/users"
```

### **Get a User by ID**
```sh
curl -X GET "http://localhost:3000/users/1"
```

### **Update a User**
```sh
curl -X PUT "http://localhost:3000/users/1" -H "Content-Type: application/json" -d '{"name": "Alice Updated", "email": "alice_new@example.com"}'
```

### **Delete a User**
```sh
curl -X DELETE "http://localhost:3000/users/1"
```

---

## **🚀 Summary**
✅ **SQLite** for a lightweight DB  
✅ **Express.js** for a simple REST API  
✅ **Sequelize** for ORM and easy DB handling  
✅ **CORS & body-parser** for handling API requests  

Let me know if you need enhancements like JWT authentication or Dockerization! 🚀
