const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./models/user')
mongoose.connect("mongodb+srv://root:root@cluster0.8xhla.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true})

const PORT = 4000;
 const app = express();

 mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully.')
})
 app.use(cors())
 app.use(express.json())

 app.get("/", (req, res) => {
    User.find((err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.json(user)
        }
    });
 });
 
 app.post("/createUser", (req, res) => {
    const newUser = new User(req.body) 
    newUser.save().then((newUser) => {
        res.json(newUser)
    })
    .catch((err) => {
        res.status(500).send(err.message)
    });
 });

 app.get("/:id", (req, res) => {
     const id = req.params.id;
     User.findById(id, (err, user) => {
         res.json(user);
     });
 });
 app.listen(PORT, () => {
console.log("Server is running on port " + PORT)
 })