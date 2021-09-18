/*
    Company == null
    blog == ""
    twitter_username == null
    location == null
    bio == null
*/

/* background squares */
const ulSquares = document.querySelector("ul.squares")

for(let i = 0; i < 11; i++) {
    const li = document.createElement("li")

    const random = (min,max) => Math.random() * (max - min) + min

    const size = Math.floor(random(10,120))
    const position = random(1,99)
    const delay = random(5, 0.1)
    const duration = random(20,10)

    li.style.width = `${size}px`
    li.style.height = `${size}px`
    li.style.bottom = `-${size}px`

    li.style.left = `${position}%`

    li.style.animationDelay = `${delay}s`
    li.style.animationDuration = `${duration}s`
    li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()})`


    ulSquares.appendChild(li)
}

let btnElement = document.getElementById("btnElement")

const showData = result => {
    document.querySelector("#user-not-found").style.display = "none"
    document.querySelector(".content").style.display = "flex"
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
            // console.log(campo + "=" + result[campo])
        }
    }
    document.querySelector("#avatar_url").src = `${result['avatar_url']}`
    document.querySelector("#created_at").innerHTML = `Joined ${day} ${month} ${year}`
    document.querySelector("#login").innerHTML = `@${result['login']}` 
    const adjustEmptyValues = () => {
        const arr = [
            "company", "twitter_username",
            "location", "bio"
        ]
        for(let campo in arr) {
            if(!result[arr[campo]]) {
                document.querySelector("#"+arr[campo]).innerHTML = "Not Available"
                document.querySelector("#"+arr[campo]).style.color = 'var(--dark-gray)'
                if(!result['bio']) {
                    document.querySelector("#bio").innerHTML = "This profile has no bio"
                }
            } else {
                document.querySelector("#"+arr[campo]).style.color = 'var(--gray)'
            }
            if(result['blog'].length == 0) {
                document.querySelector('#blog').innerHTML = "Not Available"
                document.querySelector('#blog').href = ""
                document.querySelector("#blog").style.color = 'var(--dark-gray)'
            }
            else {
                document.querySelector('#blog').style.color = 'var(--bright-blue)'
                document.querySelector('#blog').href = result['blog']
            }
            /*console.log("========")
            console.log(arr[campo])*/
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
    const handleError = response => {
        if(response.status == 404) throw Error(response.statusText)
        return response
    }

    fetch(`https://api.github.com/users/${user}`, options)
    .then(handleError)
        .then(response => { 
            response.json()
                .then( data => showData(data), console.log(response))
        })
        .catch( error => {
            document.querySelector("#user-not-found").style.display = "block"
            document.querySelector(".content").style.display = "none"
            console.log(error)
        })
})