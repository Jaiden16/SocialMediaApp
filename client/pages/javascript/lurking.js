document.addEventListener("DOMContentLoaded", () => {
    console.log('Dom loaded')
    addEventListeners();
    navSlide();
    populateUsers();
})

const navSlide = () => {
    const user_profile = document.querySelector('.user-profile');
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll('.nav-links li')

    user_profile.addEventListener("click", () => {
    //toggle nav
    nav.classList.toggle('nav-active');

    //animate links
    navLinks.forEach((link, index) => {
        if(link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
        }
    });

    //user profile animation
    user_profile.classList.toggle('toggle');
});
}

const addEventListeners = () => {
    let usersBtn = document.querySelector("#usersLurking")
    let postsBtn = document.querySelector("#postsLurking")

    usersBtn.addEventListener('click', displayUsers)
    postsBtn.addEventListener('click', displayPosts)

    usersBtn.click();
}

const displayUsers = () => {
let allPosts = document.querySelector("#allPosts")
allPosts.style.display = 'none'  

let allProfiles = document.querySelector("#allUserProfiles")
 allProfiles.style.display = 'block'
}

const displayPosts = () => {
    let allProfiles = document.querySelector("#allUserProfiles")
    allProfiles.style.display = 'none'   

    let allPosts = document.querySelector("#allPosts")
    allPosts.style.display = 'block' 
}
// postsList.innerHTML = "";

async function populateUsers() {
   const allUsers = document.querySelector("#listAllLurked");
   allUsers.innerHTML = "";
   const response = await axios.get(`http://localhost:3000/lurks/2`); //switch the user_id '2' with the logged in user
   response.data.payload.forEach((post) => {
    
    let userProfile = document.createElement('div')
    userProfile.setAttribute('class', 'userProfile')

    let profilePic = document.createElement('img')
    profilePic.setAttribute('class', 'profilePic')
    profilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"

    let username = document.createElement('h2')
    username.innerText = post.lurker_username

    let userBio = document.createElement('p')
    userBio.innerText = "This is the user bio"

    let unfollowBtn = document.createElement('button')
    unfollowBtn.innerText = 'Unlurk'
    unfollowBtn.addEventListener('click', unfollowUser)

    userProfile.append(profilePic, username, userBio, unfollowBtn)
    allUsers.append(userProfile)

});
// let userProfile = document.createElement('div')
// userProfile.setAttribute('class', 'userProfile')

// let profilePic = document.createElement('img')
// profilePic.setAttribute('id', 'profilePic')
// profilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"

// let username = document.createElement('h2')
// username.innerText = "Username"

// let userBio = document.createElement('p')
// userBio.innerText = "This is the user bio"

// let unfollowBtn = document.createElement('button')
// unfollowBtn.innerText = 'unlurk'
// unfollowBtn.addEventListener('click', unfollowUser)

// userProfile.append(profilePic, username, userBio, unfollowBtn)
// allUsers.append(userProfile)
}

const unfollowUser = () => {
// make api call to remove 'lurk' 
console.log('unlurk btn was clicked')
}

