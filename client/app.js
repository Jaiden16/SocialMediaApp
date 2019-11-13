document.addEventListener('DOMContentLoaded', async () => {
    let {data} = await axios.get('http://localhost:3000/session')
    if (data.session.length !== 0) {
        window.location.href = './pages/feed.html'
    }
    console.log('Dom loaded')
    hideForm()
    addEventListeners()
})

const hideForm = () => {
    let formDiv = document.querySelector("#formDiv")
    formDiv.style.display = 'none'
}

const addEventListeners = () => {
    let signUpBtn = document.querySelector("#signup_big")
    let loginForm = document.querySelector("#login_form")
    
    signUpBtn.addEventListener('click', displayForm)
    loginForm.addEventListener('submit', logUserIn)
}

const displayForm = () => {
    let formDiv = document.querySelector("#formDiv")
    formDiv.style.display = 'block'

    let inputDiv = document.querySelector("#inputDiv")
    inputDiv.style.display = 'none'
}

const logUserIn = async (event) => {
    event.preventDefault()
    let username = document.querySelector('#usernameInput').value
    let password = document.querySelector('#passwordInput').value
    
    let {data} = await axios.post(`http://localhost:3000/session`, {username, password});
    console.log(data)
    submitUserToSession(data)
    window.location.href = './pages/feed.html'
}

// const submitUserToSession = async (user) => {
//     console.log(user)
//     let {data} = await axios.post(`http://localhost:3000/session`, {username: user.username, password: user.password});
//     console.log('asdfasdfasdfasdfa', data)
// }