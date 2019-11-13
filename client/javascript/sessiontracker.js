const getSession = async () => {
    console.log('session')
    let {data} = await axios.get('http://localhost:3000/session')
    if (data.session.length === 0) {
        window.location.href = './../App.html'
        return null
    }
    return data.session[0].useridloggedin
}

const getUser = async (userID) => {
    let {data} = await axios.get(`http://localhost:3000/users/${userID}`)
    return data.payload
}

const navSlide = () => {
    const user_profile = document.querySelector('.user-profile');
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll('.nav-links li')

    user_profile.addEventListener("click", () => {
        //toggle nav
        nav.classList.toggle('nav-active');

        //animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
            }
        });

        //user profile animation
        user_profile.classList.toggle('toggle');
    });
}

const deletePost = async (event) => {
    let post = event.target.parentNode
    let postID = post.id
    let data = await axios.delete(`http://localhost:3000/posts/${postID}`)
    console.log(data)
    post.parentNode.removeChild(post)
}

const savePostEdits = async (event) => {
    let post = event.target.parentNode
    let button = event.target
    let editButton = document.createElement('button')
    let postID = post.id
    let oldInput = post.querySelector(`.paraDiv textarea`)
    let newP = document.createElement('p')
    
    editButton.innerText = 'EDIT'
    editButton.addEventListener('click', editPost)
    
    newP.innerText = oldInput.value
    post.replaceChild(editButton, button)
    post.querySelector(`.paraDiv`).replaceChild(newP, oldInput)
    let {data} = await axios.patch(`http://localhost:3000/posts/${postID}`, {body: oldInput.value})
}

const editPost = async (event) => {
    let post = event.target.parentNode
    let button = event.target
    let saveButton = document.createElement('button')
    let postID = post.id
    let oldP = post.querySelector(`.paraDiv p`)
    let newInput = document.createElement('textarea')
    
    saveButton.innerText = 'SAVE'
    saveButton.addEventListener('click', savePostEdits)
    newInput.style.width = '70%'
    newInput.style.resize = 'none'
    newInput.style.rows = 10
    newInput.value = oldP.innerText
    post.replaceChild(saveButton, button)
    console.log(post, oldP)
    post.querySelector(`.paraDiv`).replaceChild(newInput, oldP)

    console.log(data, post, postID)
    // post.parentNode.removeChild(post)
}

