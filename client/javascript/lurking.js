document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    addEventListeners();
    navSlide();
    let user_id = await getSession();
    populateUsers(user_id);
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
        unfollowBtn.addEventListener('click', () => {
            unfollowUser(userID, username)
        })

        userProfile.append(profilePic, username, userBio, unfollowBtn)
        userProfile.append(profilePic, username, userBio, unfollowBtn)
        allUsers.append(userProfile)

        let lurkedPersonsPosts = await popPost(lurked.lurker_id)
        populatePosts(lurkedPersonsPosts, userID)
        profilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"
        username.innerText = lurked.lurker_username
        userBio.innerText = lurkedPersonsPosts[0].bio
        console.log(lurkedPersonsPosts)
    });

}

const popPost = async (lurked) => {
    const {
        data
    } = await axios.get(`http://localhost:3000/posts/user/${lurked}`); //switch the user_id '2' with the logged in user
    return data.payload
}

async function populatePosts(posts, userID) {
    let lurkedUserPosts = document.createElement('div')
    const allUsersPosts = document.querySelector("#listAllLurkedPosts");
    let postProfilePic = document.createElement('img')
    let username = document.createElement('h2')

    username.innerText = posts[0].username
    lurkedUserPosts.setAttribute('class', 'post')
    lurkedUserPosts.append(postProfilePic, username)
    postProfilePic.setAttribute('class', 'postProfilePic')
    postProfilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"

    posts.forEach(async (post) => {
        console.log("Stuff", post)
        let paraDiv = document.createElement('div')
        let userPost = document.createElement('p')
        let iconsDiv = document.createElement('div')
        let faveIcon = document.createElement('i')
        let unlike = document.createElement('i')
        let space = document.createElement('br')
        let likes = document.createElement('span')
        
        iconsDiv.setAttribute('id', 'iconsDiv')
        faveIcon.setAttribute('class', 'material-icons')
        unlike.setAttribute('class', 'material-icons')
        paraDiv.setAttribute('class', 'paraDiv')
        // console.log(post.id)
        // paraDiv.id = post.id
        // faveIcon.id = post.id
  
        faveIcon.innerText = 'favorite'
        unlike.innerText = 'thumb_down'
        userPost.innerText = post.body
        
        //getLikes(post.id);
        const response = await axios.get(`http://localhost:3000/likes/posts/${post.id}`)
        const arrLength = response.data.payload.length 
        console.log(arrLength)
        likes.innerText = `${arrLength} likes`
        paraDiv.append(likes)


        faveIcon.addEventListener('click', () => {
            addLike(userID, post.id);
        })

        unlike.addEventListener('click', () => {
            removeLike(userID, post.id);
        })

        iconsDiv.append(faveIcon, unlike)
        paraDiv.append(userPost)
        lurkedUserPosts.append(iconsDiv, paraDiv, space)
    })
    allUsersPosts.append(lurkedUserPosts)
}

// 'unlurks' user after user clicks on 'unlurk' button
const unfollowUser = async (curr_userID, lurker_username) => {
    let lurkerUserName = lurker_username.innerText 
    const response = await axios.delete(`http://localhost:3000/lurks/deleteLurk/${curr_userID}/${lurkerUserName}`)
    populateUsers()
}


// const getLikes = async (post_id) => {
//     const response = await axios.get(`http://localhost:3000/likes/posts/${post_id}`)
//     const arrLength = response.data.payload.length 
//     console.log(arrLength + "likes")
// }

const addLike = async (curr_userID, post_id) => {
    const response = await axios.post(`http://localhost:3000/likes/posts/${curr_userID}/${post_id}`)
    populateUsers(curr_userID)
}

const removeLike = async (curr_userID, post_id) => {
    const response = await axios.delete(`http://localhost:3000/likes/posts/${post_id}/${curr_userID}`)
    populateUsers(curr_userID)
}