export const getUsers = () => fetch("http://localhost:4000").then(res => res.json)
export const loadUsers = () => fetch("http://localhost:4000/getAllCerts")
export const loadAppointmentsById = (id) => fetch(`http://localhost:4000/getApptById/${id}`)
export const loadAppointments = () => fetch("http://localhost:4000/getAppointments")
export const downloadFile = (name) => fetch(`http://localhost:4000/${name}`)
export const getCertByStatus = (certBody) => fetch("http://localhost:4000/getCertificateByStatus", {  
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(certBody)
})

export const getUserInfoById = (aUser) => fetch("http://localhost:4000/getCerts", {  
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(aUser)
})

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

// Subscriber Make Appointment
export const makeAppointment = (body) => fetch("http://localhost:4000/createAppointment", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
})

// Web Admin updates certificate
export const updateCertificate = (body) => fetch("http://localhost:4000/updateCertificate", {
    method: "PUT",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
})