document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    navSlide();
    let user_id = await getSession()
    console.log(user_id)
    let userProfile = await getUser(user_id)
})
