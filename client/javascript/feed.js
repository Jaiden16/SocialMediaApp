document.addEventListener("DOMContentLoaded", () => {
    console.log('Dom loaded')
    loadPosts();
    navSlide();

    const postForm = document.querySelector('#addPostForm');

    postForm.addEventListener('submit', addPostFormSubmitted);

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


    //user profile animation
    user_profile.classList.toggle('toggle');
};


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