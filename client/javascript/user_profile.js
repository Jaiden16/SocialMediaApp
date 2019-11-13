document.addEventListener("DOMContentLoaded", async () => {
    console.log('Dom loaded')
    navSlide();
    let user_id = await getSession()
    if (!user_id) return
    console.log(user_id)
    let userProfile = await getUser(user_id)
    populateUser(userProfile)
})


async function populateUser(user) {
    console.log(user)
    const card = document.querySelector('#card')
    card.innerHTML = ''

    let profilePic = document.createElement('img');
    let userName = document.createElement('h2')
    let userBio = document.createElement('p')
    let moreInfoMaybe = document.createElement('p')
    let space = document.createElement('br')
    let span = document.createElement('span')
    let ul = document.createElement('ul')
    let li = document.createElement('li')
    let spanL = document.createElement('span')
    let spanR = document.createElement('span')
    let editButton = document.createElement('button')

    profilePic.src = user.profile_pic
    editButton.innerText = 'EDIT'
    userName.innerText = user.username
    userBio.innerText = user.bio
    moreInfoMaybe.innerText = 'More Info:'
    li.innerText = 'Lurks and stuff'
    spanL.innerText = 'Age: ' + user.age
    spanR.innerText = 'Email: ' + user.email + '  Location: ' + user.location
    span.className = "lurking_amount"
    spanL.className = "left bottom"
    spanR.className = "right bottom"


    card.append(profilePic, userName, userBio, moreInfoMaybe, spanL, spanR)
    moreInfoMaybe.append(space, space, span)
    span.append(ul)
    ul.append(li)
    
}