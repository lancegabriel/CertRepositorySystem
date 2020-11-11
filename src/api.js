export const getUsers = () => fetch("http://localhost:4000").then(res => res.json)
export const registerUser = (aUser) => fetch("http://localhost:4000/createUser", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(aUser)
})