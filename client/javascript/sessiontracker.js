const getSession = async () => {
    let {data} = await axios.get('http://localhost:3000/session')
    console.log(data.session[0].useridloggedin)
    return data.session[0].useridloggedin
}

const getUser = async (userID) => {
    console.log(userID)
    let {data} = await axios.get(`http://localhost:3000/users/${userID}`)
    console.log(data.payload)
    return data.payload
}

let log = {}
document.addEventListener('DOMContentLoaded', async () => {
    let loggedIn = await getSession();
    console.log('loggedIn', loggedIn)
    let loggedUser = await getUser(loggedIn);
    log.loggedUser = loggedUser
    console.log(loggedUser)
    console.log(log)
});