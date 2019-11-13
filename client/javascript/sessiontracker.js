const getSession = async () => {
    let {data} = await axios.get('http://localhost:3000/session')
    console.log(data.session[0].useridloggedin)
}

getSession();