document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    navSlide();
    let user_id = await getSession()
    console.log(user_id)
    loadPosts(user_id);
    const postForm = document.querySelector('#addPostForm');
    postForm.addEventListener('submit', addPostFormSubmitted);
    
})

async function loadPosts(user_id) {
    const postsList = document.querySelector('#randomFeedList');
    const user = await getUser(user_id)
    postsList.innerHTML = "";

    const response = await axios.get(`http://localhost:3000/posts`);
    console.log(response.data.payload)

    response.data.payload.forEach((post) => {
        console.log(post)
        addPostToFeed(post, user_id, postsList)
    });
}

const addPostFormSubmitted = async (event) => {
    event.preventDefault();
    let poster_id = await getSession()
    let feed = document.querySelector('#randomFeedList')
    let input = document.querySelector(`#${event.target.id} textarea`).value
    let postBody = {poster_id, body: input}

    let {data} = await axios.post(`http://localhost:3000/posts`, postBody);
    loadPosts(poster_id);
    // addPostToFeed(data.payload, poster_id, feed)
    console.log(data.payload)
}

const addPostToFeed = async (post, user_id, feed) => {
    let listItem = document.createElement('div');
    let paraDiv = document.createElement('div');
    let iconsDiv = document.createElement('div')
    let faveIcon = document.createElement('i')
    let unlike = document.createElement('i')
    let postPtag = document.createElement('p');
    let poster = document.createElement('h3');
    let postProfilePic = document.createElement('img')
    let space = document.createElement('br')
    let likes = document.createElement('span')
    

    postPtag.innerText = post.body
    poster.innerText = post.username
    faveIcon.innerText = 'favorite'
    unlike.innerText = 'thumb_down'
    postProfilePic.src = post.profile_pic
    listItem.id = post.id
    postProfilePic.setAttribute('class', 'postProfilePic')
    listItem.setAttribute('class', 'post')
    paraDiv.setAttribute('class', 'paraDiv')
    faveIcon.setAttribute('class', 'material-icons')
    unlike.setAttribute('class', 'material-icons')
    iconsDiv.setAttribute('id', 'iconsDiv')

    iconsDiv.append(faveIcon, unlike)

    const response = await axios.get(`http://localhost:3000/likes/posts/${post.id}`)
    const arrLength = response.data.payload.length 
    console.log(arrLength)
    likes.innerText = `${arrLength} likes`
    paraDiv.append(likes)


    faveIcon.addEventListener('click', () => {
        addLike(user_id, post.id);
    })

    unlike.addEventListener('click', () => {
        removeLike(user_id, post.id);
    })

    if (post.poster_id === user_id) {
        let deletePostButton = document.createElement('button')
        deletePostButton.innerText = 'X'
        deletePostButton.addEventListener('click', deletePost)
        let editPostButton = document.createElement('button')
        editPostButton.innerText = 'EDIT'
        editPostButton.addEventListener('click', editPost)
        listItem.append(postProfilePic, editPostButton, deletePostButton, poster, iconsDiv, paraDiv)
    } else {
        listItem.append(postProfilePic, poster, iconsDiv, paraDiv)
    }

    paraDiv.append(postPtag)
    feed.prepend(listItem);
}

const addLike = async (curr_userID, post_id) => {
    const response = await axios.post(`http://localhost:3000/likes/posts/${curr_userID}/${post_id}`)
    loadPosts(curr_userID)
}

const removeLike = async (curr_userID, post_id) => {
    const response = await axios.delete(`http://localhost:3000/likes/posts/${post_id}/${curr_userID}`)
    loadPosts(curr_userID)
}