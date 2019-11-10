document.addEventListener("DOMContentLoaded", () => {
    console.log('Dom loaded')
    addEventListeners();
    navSlide();
})

const addEventListeners = () => {
    let usersBtn = document.querySelector("#usersLurking")
    let postsBtn = document.querySelector("#postsLurking")

    usersBtn.addEventListener('click', displayUsers)
    postsBtn.addEventListener('click', displayPosts)

    let unfollowBtn = document.getElementsByClassName("unfollow")
    

    usersBtn.click()
}

const displayUsers = () => {
let allProfiles = document.querySelector("#allUserProfiles")
 allProfiles.style.display = 'block'

// let allProfiles = document.querySelector("#allUserProfiles")
// let userProfile = document.createElement('div')
// userProfile.setAttribute('class', 'userProfile')

// let profilePic = document.createElement('img')
// profilePic.setAttribute('id', 'profilePic')
// profilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"

// let username = document.createElement('h2')
// username.innerText = "Username"

// let userBio = document.createElement('p')
// userBio.innerText = "This is the user bio"

// userProfile.append(profilePic, username, userBio)
// allProfiles.append(userProfile)
}


const displayPosts = () => {
    let allProfiles = document.querySelector("#allUserProfiles")
    allProfiles.style.display = 'none'   

}

const unfollowUser = () => {
// make api call to remove 'lurk' 
console.log('unlurk btn was clicked')
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