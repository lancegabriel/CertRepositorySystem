const multer = require('multer')
const uuidv4 = require('uuid')

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

export const getUsers = () => fetch("http://localhost:4000").then(res => res.json)

export const registerUser = (aUser) => fetch("http://localhost:4000/createUser", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(aUser)
})


export const uploadCertificate = (body) => fetch("http://localhost:4000/uploadCertificate", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
})

export const findUser = (aUser) => fetch("http://localhost:4000/checkUser", {  
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(aUser)
})