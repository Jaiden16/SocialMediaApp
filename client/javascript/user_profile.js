document.addEventListener("DOMContentLoaded", () => {
    console.log('Dom loaded')
    navSlide();
    let user_id = getSession()
    
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

async function populateUsers(userID) {
    console.log(userID)
    const card = document.querySelector('#card')
    let profilePic = document.createElement('img');
    let userName = document.createElement('h2')
    let userBio = document.createElement('p')
    // cons
    // const allUsers = document.querySelector("#listAllLurked");
    // const allUsersPosts = document.querySelector("#listAllLurkedPosts");
    // allUsers.innerHTML = "";
    // allUsersPosts.innerHTML = "";
    // const response = await axios.get(`http://localhost:3000/lurks/${userID}`); //switch the user_id '2' with the logged in user
    // response.data.payload.forEach(async (lurked) => {
    //     let userProfile = document.createElement('div')
    //     let profilePic = document.createElement('img')
    //     let username = document.createElement('h2')
    //     let userBio = document.createElement('p')
    //     let unfollowBtn = document.createElement('button')
        
    //     userProfile.setAttribute('class', 'userProfile')
    //     profilePic.setAttribute('class', 'profilePic')
        
    //     unfollowBtn.innerText = 'Unlurk'
    //     unfollowBtn.addEventListener('click', unfollowUser)
        
    //     userProfile.append(profilePic, username, userBio, unfollowBtn)
    //     userProfile.append(profilePic, username, userBio, unfollowBtn)
    //     allUsers.append(userProfile)
        
    //     let lurkedPersonsPosts = await popPost(lurked.lurker_id)
    //     populatePosts(lurkedPersonsPosts)
    //     profilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"
    //     username.innerText = lurked.lurker_username
    //     userBio.innerText = lurkedPersonsPosts[0].bio
    //     console.log(lurkedPersonsPosts)
    // });
    
}