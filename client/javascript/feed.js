document.addEventListener("DOMContentLoaded", () => {
    console.log('Dom loaded')
    loadPosts();
    navSlide();

    const postForm = document.querySelector('#addPostForm');

    postForm.addEventListener('submit', addPostFormSubmitted);

})

async function loadPosts() {
    const postsList = document.querySelector('#randomFeedList');
    postsList.innerHTML = "";

    const response = await axios.get(`http://localhost:3000/posts`);
    response.data.payload.forEach((post) => {
        // console.log(post)
      for(let element of post.all_userposts){
        let listItem = document.createElement("li");
        let poster = document.createElement('strong');
        poster.innerText = post.user_name
        listItem.innerText = `\nPost: ${element}\n`;//Likes: ${post.likes} Views: ${post.views} \n\n`;
        listItem.prepend(poster)
        postsList.append(listItem);
      }
    });
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