document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    navSlide();
    let user_id = await getSession()
    if (!user_id) return
    console.log(user_id)
    let userProfile = await getUser(user_id)
    document.querySelectorAll('.albums .album').forEach(album => album.addEventListener('click', showAlbumPics))
})

const showAlbumPics = () => {

}