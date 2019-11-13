document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    navSlide();
    let user_id = await getSession()
    showAlbumPics(user_id)
    document.querySelectorAll('.albums .album').forEach(album => album.addEventListener('click', showAlbumPics))
})

const showAlbumPics = async (userID) => {
    let albums = document.querySelector('.albums')
    albums.innerHTML = ''
    let userProfile = await getUser(userID)
    let {data} = await axios.get(`http://localhost:3000/albums/${userID}`)
    data.payload.forEach(async album => {
        let albumDiv = document.createElement('div')
        let albumCover = document.createElement('img')
        let albumDetails = document.createElement('div')
        let albumTitle = document.createElement('h2')
        let albumOwner = document.createElement('p')
        let albumDesc = document.createElement('p')

        albums.append(albumDiv)
        albumDiv.append(albumCover, albumDetails)
        albumDetails.append(albumTitle, albumOwner, albumDesc)
        albumDiv.className = 'album'
        albumCover.className = 'album_cover'
        albumDetails.className = 'album_details'
        albumOwner.className = 'album_owner'
        albumDesc.className = 'album_desc'

        let {data} = await axios.get(`http://localhost:3000/photos/albums/${album.id}`)
        let cover = data.payload[data.payload.length - 1].pic
        albumCover.src = cover
        console.log(album.album_name)
        albumTitle.innerText = album.album_name
        albumOwner.innerText = userProfile.username
        albumDesc.innerText = 'ablum description goes here'
    })
    console.log(data.payload)
}


// <div class="album">
//     <img class="album_cover" src = "./ZoomStuff.jpg">
//     <div class="album_details">
//         <h2>Album Title</h2>
//         <p class="album_owner">Owner Name</p>
//         <p class="album_desc">The childhood orbits. A sundry establishes the employer. 
//             A yard monkeys an infinite mechanic below the anniversary. The supplier 
//             nests. The hunted goal camps past a bridge.</p>
//     </div>
// </div> 