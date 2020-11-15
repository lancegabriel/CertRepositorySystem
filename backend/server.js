const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./models/user')
const multer = require('multer')
const uuid = require('uuid').v4;
const bodyParser = require('body-parser');
mongoose.connect("mongodb+srv://root:root@cluster0.8xhla.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})

const PORT = 4000;
const app = express();

 mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully.')
})

 app.use(cors())
 app.use(express.json())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Certificates', express.static('Certificates'));
 const DIR = '../public/Certificates';
let finalFileName = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        finalFileName = uuid() + '-' + fileName;
        cb(null, finalFileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only PDF is allowed!'));
        }
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

 
 app.post("/uploadCertificate", upload.single("theFile"), (req, res) => {
    console.log("ID:" + req.body.id)
    var url = req.protocol + '://' + req.get('host')
    var id = req.body.id;
    var fileName = req.body.fileName;
    //var fullUrl = url + '/public/Certificates/' + fileName;
    console.log(finalFileName)
    User.update(
        { "_id": id },
        { "$push": 
            {"certificates":
                {
                    pdfUrl: finalFileName      
                }
            }
        }).then(res => {
            res.send("Certificate uploaded!")
        }).catch(err => {
            res.send("Something went wrong!")
        })
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