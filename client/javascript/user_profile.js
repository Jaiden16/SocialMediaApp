document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    navSlide();
    let user_id = await getSession()
    if (!user_id) return
    console.log(user_id)
    let userProfile = await getUser(user_id)
    populateUser(userProfile)
    // if (!user_id) window.location.href = './App.html'
})


async function populateUser(user) {
    console.log(user)
    const card = document.querySelector('#card')
    card.innerHTML = ''

    let profilePic = document.createElement('img');
    let userName = document.createElement('h2')
    let userBio = document.createElement('p')
    let moreInfoMaybe = document.createElement('p')
    let space = document.createElement('br')
    let span = document.createElement('span')
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    let spanL = document.createElement('span')
    let spanR = document.createElement('span')

    profilePic.src = user.profile_pic
    userName.innerText = user.username
    userBio.innerText = user.bio
    moreInfoMaybe.innerText = 'More Info:'
    li.innerText = 'Lurks and stuff'
    spanL.innerText = 'Age: ' + user.age
    spanR.innerText = 'Email: ' + user.email + '  Location: ' + user.location
    span.className = "lurking_amount"
    spanL.className = "left bottom"
    spanR.className = "right bottom"


    card.append(profilePic, userName, userBio, moreInfoMaybe, spanL, spanR)
    moreInfoMaybe.append(space, space, span)
    span.append(ul)
    ul.append(li)


    

    
    
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