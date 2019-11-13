document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', addFormSubmitted)
});


let obj = {
    signup_form: {
        listID: '#signup_form',
        getURL: () => `http://localhost:3000/users`,
        postURL: `http://localhost:3000/users/`,
        
    },
}


const addFormSubmitted = async (event) => {
    event.preventDefault();
    
    let form = event.target.id
    let formInputs = document.querySelectorAll(`#${form} input`)
    let postBody = {}
    formInputs.forEach(input => postBody[input.id] = input.value)

    let {data} = await axios.post(obj[form].postURL, postBody);
    submitUserToSession(data.payload)
    console.log(data.payload)
    // window.location.href = './feed.html'
    return data.payload
}

const submitUserToSession = async (user) => {
    console.log(user)
    let {data} = await axios.post(`http://localhost:3000/session`, {username: user.username, password: user.password});
    console.log('asdfasdfasdfasdfa', data)
}