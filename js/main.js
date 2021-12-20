let btnElement = document.getElementById('btnElement')
let blogElement = document.querySelector('#blog')

const showData = result => {
  document.querySelector('#user-not-found').style.display = 'none'
  document.querySelector('.content').style.display = 'flex'
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let created_at = new Date(result['created_at'])
  let year = created_at.getFullYear()
  let month = months[created_at.getMonth()]
  let day = created_at.getDate()

  for (let campo in result) {
    if (document.querySelector('#' + campo)) {
      document.querySelector('#' + campo).innerHTML = result[campo]
    }
  }
  document.querySelector('#avatar_url').src = `${result['avatar_url']}`
  document.querySelector(
    '#created_at'
  ).innerHTML = `Joined ${day} ${month} ${year}`
  document.querySelector('#login').innerHTML = `@${result['login']}`
  const adjustEmptyValues = () => {
    const arr = ['company', 'twitter_username', 'location', 'bio']
    for (let campo in arr) {
      if (!result[arr[campo]]) {
        document.querySelector('#' + arr[campo]).innerHTML = 'Not Available'
        document.querySelector('#' + arr[campo]).style.color =
          'var(--dark-gray)'
        if (!result['bio']) {
          document.querySelector('#bio').innerHTML = 'This profile has no bio'
        }
      } else {
        document.querySelector('#' + arr[campo]).style.color = 'var(--gray)'
      }
      if (result['blog'].length == 0) {
        blogElement.innerHTML = 'Not Available'
        blogElement.style.color = 'var(--dark-gray)'
        blogElement.removeAttribute('href')
      } else {
        blogElement.style.color = 'var(--bright-blue)'
        blogElement.href = result['blog']
      }
    }
  }
  adjustEmptyValues()
}

btnElement.addEventListener('click', e => {
  const user = document.getElementById('inputElement').value
  const handleError = response => {
    if (response.status == 404) throw Error(response.statusText)
    return response
  }

  fetch(`https://api.github.com/users/${user}`)
    .then(handleError)
    .then(response => {
      response.json().then(data => showData(data))
    })
    .catch(error => {
      document.querySelector('#user-not-found').style.display = 'block'
      document.querySelector('.content').style.display = 'none'
    })
})

toggle.onclick = () => {
  toggle.classList.toggle('active')
  document.querySelector('.title').classList.toggle('active')
  document.querySelector(':root').classList.toggle('active')
}
