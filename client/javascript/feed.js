document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    loadPosts();
    navSlide();
    let user_id = await getSession()
    if (!user_id) return
    console.log(user_id)
    let userProfile = await getUser(user_id)
    const postForm = document.querySelector('#addPostForm');

    postForm.addEventListener('submit', addPostFormSubmitted);

})

async function loadPosts() {
    const postsList = document.querySelector('#randomFeedList');
    postsList.innerHTML = "";

    const response = await axios.get(`http://localhost:3000/posts`);
  //  console.log(response.data.payload)

    response.data.payload.forEach((post) => {
        // console.log(post)
      for(let element of post.all_userposts){
        let listItem = document.createElement('div');
        let paraDiv = document.createElement('div');
        let postPtag = document.createElement('p');
        let poster = document.createElement('h3');
        let postProfilePic = document.createElement('img')
        
        postPtag.innerText = element 
        poster.innerText = post.user_name
        postProfilePic.src = "https://i0.wp.com/acaweb.org/wp-content/uploads/2018/12/profile-placeholder.png?fit=300%2C300&ssl=1"
        postProfilePic.setAttribute('class', 'postProfilePic')
        listItem.setAttribute('class', 'post')
        paraDiv.setAttribute('class', 'paraDiv')
        //listItem.innerText = `\nPost: ${element}\n`;//Likes: ${post.likes} Views: ${post.views} \n\n`;
        // listItem.prepend(poster)

        let faveIcon = document.createElement('i')
        faveIcon.setAttribute('class', 'material-icons')
        faveIcon.innerText = 'favorite'

        paraDiv.append(postPtag)
        listItem.append(postProfilePic, poster, faveIcon, paraDiv)
        postsList.append(listItem);
      }
    });
}

const addPostFormSubmitted = () => {
    console.log('form was submitted')
}