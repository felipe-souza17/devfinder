let btnElement = document.getElementById("btnElement")

const showData = result => {
    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]
    let date = new Date(result['created_at'])
    let year = date.getFullYear()
    let month = months[date.getMonth()]
    let day = date.getDate()

    document.querySelector("#avatar_url").src = `${result['avatar_url']}`
    document.querySelector("#name").innerHTML = `${result['name']}`
    document.querySelector("#login").innerHTML = `@${result['login']}`
    document.querySelector("#created_at").innerHTML = `Joined ${day} ${month} ${year}`
    document.querySelector("#bio").innerHTML = `${result['bio']}`
    document.querySelector("#public_repos").innerHTML = `${result['public_repos']}`
    document.querySelector("#followers").innerHTML = `${result['followers']}`
    document.querySelector("#following").innerHTML = `${result['following']}`
    document.querySelector("#location").innerHTML = `${result['location']}`
    document.querySelector("#blog").innerHTML = `${result['blog']}`
    document.querySelector("#company").innerHTML = `${result['company']}`
}

btnElement.addEventListener("click", e => {
    const user = document.getElementById("inputElement").value
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://api.github.com/users/${user}`, options)
        .then((response) => { response.json()
            .then( data => showData(data))
        })
        .catch( e => {
            console.log('Deu Erro:'+ e.message)
            console.log(user)
        })
})