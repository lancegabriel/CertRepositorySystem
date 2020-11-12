const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./models/user')
const multer = require('multer')
const uuidv4 = require('uuid/v4')
mongoose.connect("mongodb+srv://root:root@cluster0.8xhla.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})

const DIR = '../public/Certificates'
const PORT = 4000;
const app = express();

 mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully.')
})

 app.use(cors())
 app.use(express.json())

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

 // User APIs
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
        res.status(500).send("Error!")
    });
 });

 app.post("/checkUser", async(req, res) => {
    var thisUsername = req.body.username;
    const user = await User.findOne({ username: thisUsername})
    console.log(user)
    if (!user) {
        res.send("User not found!") 
    } else {
        res.json(user)
    }
 });

 
 app.post("/uploadCertificate", async(req, res) => {
    var id = req.body.id;
    var url = req.body.url;
    const user = await User.update(
        { "_id": id },
        { "$push": 
            {"certificates":
                {
                    pdfUrl: url      
                }
            }
        })
    console.log(user)
    if (!user) {
        res.send("User not found!") 
    } else {
        res.json(user)
    }
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