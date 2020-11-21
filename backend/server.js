const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require('./models/user')
const Appointment = require('./models/Appointment')
const Link = require('./models/link')
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

app.get("/getAllCerts", (req, res) => {
    User.find((err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.json(user)
        }
    });
 });

 // User APIs
 app.post("/getCerts", (req, res) => {
    var ObjectId = require('mongodb').ObjectID;
     const id = req.body.id
   //  console.log(id)
    User.find({"_id": ObjectId(id) }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.json(user)
        }
    });
 });
 
 app.get("/getAppointments", (req, res) => {
    Appointment.find((err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.json(user)
        }
    });
 });

 app.get("/getAllLinks", (req, res) => {
    Link.find((err, link) => {
        if (err) {
            console.log(err)
        } else {
            res.json(link)
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

 app.post("/createAppointment", (req, res) => {
    const appointment = new Appointment(req.body) 
    appointment.save().then((newUser) => {
        res.json(newUser)
    })
    .catch((err) => {   
        res.status(500).send("Error!")
    });
 });

 app.post("/sendLink", (req, res) => {
    const aLink = new Link(req.body) 
    aLink.save().then((newLink) => {
        res.json(newLink)
    })
    .catch((err) => {   
        res.status(500).send("Error!")
    });
 });

 app.post("/checkUser", async(req, res) => {
    var thisUsername = req.body.username;
    const user = await User.findOne({ username: thisUsername})
    if (!user) {
        res.send("User not found!") 
    } else {
        res.json(user)
    }
 });

 app.get("/download/:name", (req, res) => {
     var link = req.params.name;
     console.log(link)
     res.download("../public/Certificates/"+link, (err) => {
         if (err) {
             res.status(500).send({
                 message: "Could not download the file. " + err,
             })
         }
     })
 });

 app.post("/getCertificateByStatus", (req, res) => {
     const status = req.body.status;
     const id = req.body.id;
     var ObjectId = require('mongodb').ObjectID;
     User.aggregate([
         {
             $match: { "_id": ObjectId(id)}
         },
         {
             $addFields: {
                 "Certificates": {
                     $filter: {
                         input: "$Certificates",
                         cond: {
                             $eq: ["$$this.status", status]
                         }
                     }
                 }
             }
         }
     ], (err, result) => {
         if (err) {
             console.log(err)
         } else {
             res.json(result)
         }
     })
    //     User.find({"_id": ObjectId(id),
    //               certificates: 
    //                 { $not: 
    //                     { $elemMatch: 
    //                         { status: 
    //                             { $ne: status}}}}}, (err, user) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         res.json(user)
    //     }
    // });
})

 app.put("/updateCertificate", (req, res) => {
    console.log("hi")
     var id = req.body.id;
     var certId = req.body.certId;
     var thisStatus = req.body.status
    
    // console.log(""id + "," + certId + "," + thisStatus"")
     var ObjectId = require('mongodb').ObjectID;
     User.update({
         "_id": ObjectId(id),
         "certificates._id": ObjectId(certId)
     },
     {
         "$set": {
             "certificates.$.status": thisStatus
         }
     },
     {upsert: true}
     ).then(res=> {
        res.send("Certificate uploaded!")
    }).catch(err => {
        console.log(err)
        res.send("Something went wrong!")
    })
})
    
 app.put("/uploadCertificate", upload.single("theFile"), (req, res) => {
    console.log("ID:" + req.body.id)
    var id = req.body.id;
    var fName = req.body.name;
    var desc = req.body.description;
    var thisStatus = "Pending Approval"
    User.update(
        { "_id": id },
        { "$push": 
            {"certificates":
                {
                    pdfUrl: finalFileName,
                    name: fName,
                    description: desc,
                    status: thisStatus
                }
            }
        }).then(res => {
            res.send("Certificate uploaded!")
        }).catch(err => {
            res.send("Something went wrong!")
        })
 });

 app.delete("/removeApptById/:id", (req, res) => {
    const id = req.params.id;
    console.log("ID:" + id)
    var ObjectId = require('mongodb').ObjectID;
    Appointment.deleteOne({"_id": ObjectId(id)}, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Success")
        }
    })
 })

 app.get("/getApptById/:id", (req, res) => {
    const id = req.params.id;
    Appointment.find({"userId": id}, (err, appt) => {
        if (err) {
            console.log(err)
        } else {
            res.json(appt)
        }
    });
 });

 app.get("/:id", (req, res) => {
     const id = req.params.id;
     User.findById((err, user) => {
         res.json(user);
     });
 });

 app.listen(PORT, () => {
console.log("Server is running on port " + PORT)
 })