document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    addEventListeners();
    navSlide();
    let user_id = await getSession();
    if (!user_id) return
    populateUsers(user_id);
    // populatePosts();
})


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

async function populateUsers(userID) {
    console.log(userID)
    const allUsers = document.querySelector("#listAllLurked");
    const allUsersPosts = document.querySelector("#listAllLurkedPosts");
    allUsers.innerHTML = "";
    allUsersPosts.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/lurks/${userID}`); //switch the user_id '2' with the logged in user
    response.data.payload.forEach(async (lurked) => {
        let userProfile = document.createElement('div')
        let profilePic = document.createElement('img')
        let username = document.createElement('h2')
        let userBio = document.createElement('p')
        let unfollowBtn = document.createElement('button')
        
        userProfile.setAttribute('class', 'userProfile')
        profilePic.setAttribute('class', 'profilePic')
        
        unfollowBtn.innerText = 'Unlurk'
        unfollowBtn.addEventListener('click', unfollowUser)
        
        userProfile.append(profilePic, username, userBio, unfollowBtn)
        userProfile.append(profilePic, username, userBio, unfollowBtn)
        allUsers.append(userProfile)
        
        let lurkedPersonsPosts = await popPost(lurked.lurker_id)
        populatePosts(lurkedPersonsPosts)
        profilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"
        username.innerText = lurked.lurker_username
        userBio.innerText = lurkedPersonsPosts[0].bio
        console.log(lurkedPersonsPosts)
    });
    
}

const popPost = async (lurked) => {
    const {data} = await axios.get(`http://localhost:3000/posts/user/${lurked}`); //switch the user_id '2' with the logged in user
    return data.payload
}

async function populatePosts(posts) {
    let lurkedUserPosts =  document.createElement('div')
    const allUsersPosts = document.querySelector("#listAllLurkedPosts");
    let postProfilePic = document.createElement('img')
    let username = document.createElement('h2')
    
    username.innerText = posts[0].username
    lurkedUserPosts.setAttribute('class', 'post')
    lurkedUserPosts.append(postProfilePic, username)
    postProfilePic.setAttribute('class', 'postProfilePic')
    postProfilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"
    
    posts.forEach((post) => {
        console.log("Stuff", post)
        let paraDiv = document.createElement('div')
        let postProfilePic = document.createElement('img')
        let username = document.createElement('h2')
        let userPost = document.createElement('p')
        
        paraDiv.setAttribute('class', 'paraDiv')
        userPost.innerText = post.body
    
        paraDiv.append(userPost)
        lurkedUserPosts.append(paraDiv)
    })
    allUsersPosts.append(lurkedUserPosts)
}


const unfollowUser = () => {
// make api call to remove 'lurk' 
console.log('unlurk btn was clicked')
}

