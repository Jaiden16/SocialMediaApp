const getSession = async () => {
    console.log('session')
    let {data} = await axios.get('http://localhost:3000/session')
    if (data.session.length === 0) {
        window.location.href = './../App.html'
        return null
    }
    return data.session[0].useridloggedin
}

const getUser = async (userID) => {
    let {data} = await axios.get(`http://localhost:3000/users/${userID}`)
    return data.payload
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
