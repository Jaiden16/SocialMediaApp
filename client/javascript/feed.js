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

const addPostToFeed = (post, user_id, feed) => {
    let listItem = document.createElement('div');
    let paraDiv = document.createElement('div');
    let postPtag = document.createElement('p');
    let poster = document.createElement('h3');
    let postProfilePic = document.createElement('img')
    let faveIcon = document.createElement('i')

    postPtag.innerText = post.body
    poster.innerText = post.username
    faveIcon.innerText = 'favorite'
    postProfilePic.src = post.profile_pic
    listItem.id = post.id
    postProfilePic.setAttribute('class', 'postProfilePic')
    listItem.setAttribute('class', 'post')
    paraDiv.setAttribute('class', 'paraDiv')
    faveIcon.setAttribute('class', 'material-icons')

    if (post.poster_id === user_id) {
        let deletePostButton = document.createElement('button')
        deletePostButton.innerText = 'X'
        deletePostButton.addEventListener('click', deletePost)
        let editPostButton = document.createElement('button')
        editPostButton.innerText = 'EDIT'
        editPostButton.addEventListener('click', editPost)
        listItem.append(postProfilePic, editPostButton, deletePostButton, poster, faveIcon, paraDiv)
    } else {
        listItem.append(postProfilePic, poster, faveIcon, paraDiv)
    }

    paraDiv.append(postPtag)
    feed.prepend(listItem);
}