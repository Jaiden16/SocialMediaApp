document.addEventListener("DOMContentLoaded", () => {
    console.log('Dom loaded')
    loadPosts();

    const postForm = document.querySelector('#addPostForm');

    postForm.addEventListener('submit', addPostFormSubmitted);

})

async function loadPosts() {
    const postsList = document.querySelector('#randomFeedList');
    postsList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/posts`);
    response.data.payload.forEach((post) => {
        // console.
        let listItem = document.createElement("li");
        listItem.innerText = `Post: ${post.body} Likes: ${post.likes} Views: ${post.views} \n\n`;
        postsList.appendChild(listItem);
    });
}