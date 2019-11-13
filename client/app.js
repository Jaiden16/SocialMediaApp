document.addEventListener('DOMContentLoaded', () => {
    console.log('Dom loaded')
    hideForm()
    addEventListener()
})

const hideForm = () => {
    let formDiv = document.querySelector("#formDiv")
    formDiv.style.display = 'none'
}

const addEventListener = () => {
    let signUpBtn = document.querySelector("#signup_big")
    signUpBtn.addEventListener('click', displayForm)
}

const displayForm = () => {
    let formDiv = document.querySelector("#formDiv")
    formDiv.style.display = 'block'
}

