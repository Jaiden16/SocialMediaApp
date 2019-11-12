document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', addFormSubmitted)
});


let obj = {
    signup_form: {
        listID: '#signup_form',
        getURL: () => `http://localhost:3000/users`,
        postURL: `http://localhost:3000/users/`,
        innerText: (user) => `${user.firstname} ${user.lastname}, age ${user.age}`,
    },
}


const addFormSubmitted = async (event) => {
    event.preventDefault();
    
    let form = event.target.id
    let formInputs = document.querySelectorAll(`#${form} input`)
    let postBody = {}
    formInputs.forEach(input => postBody[input.id] = input.value)

    let {data} = await axios.post(obj[form].postURL, postBody);
    return data.payload
    // let item = data.payload;
    // console.log(item, obj[form].innerText(item))
    // addToList(document.querySelector(obj[form].listID), obj[form].innerText(item))
}

const loadList = async (listID, getURL, itemInnerText) => {
    const list = document.querySelector(listID);
    list.innerHTML = "";
    const {data} = await axios.get(getURL);
    data.payload.forEach((item) => addToList(list, itemInnerText(item)));
}

const addToList = (list, itemInnerText) => {
    let listItem = document.createElement("li");
    listItem.innerText = itemInnerText;
    list.appendChild(listItem);
}