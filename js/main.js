/*
    Company == null
    blog == ""
    twitter_username == null
    location == null
    bio == null
*/

let btnElement = document.getElementById("btnElement")

const showData = result => {
    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]
    let created_at = new Date(result['created_at'])
    let year = created_at.getFullYear()
    let month = months[created_at.getMonth()]
    let day = created_at.getDate()

    for(let campo in result) {
        if(document.querySelector("#"+campo)) {
            document.querySelector("#"+campo).innerHTML = result[campo]
            console.log(campo + "=" + result[campo])
        }
    }
    document.querySelector("#avatar_url").src = `${result['avatar_url']}`
    document.querySelector("#created_at").innerHTML = `Joined ${day} ${month} ${year}`

    const adjustEmptyValues = () => {
        if(!result['bio']) {
            document.querySelector("#bio").innerHTML = "This profile has no bio"
        }
    }
    adjustEmptyValues()
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