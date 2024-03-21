let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => data.forEach(function(toy){

    let toyCard = document.getElementById('toy-collection')
    toyCard.ClassName = 'card'
    
    let h2 = document.createElement('h2')
    toyCard.append(h2)
    h2.textContent = `${toy.name}`

    let img = document.createElement('img')
    toyCard.append(img)
    img.setAttribute('src',`${toy.image}`)
    img.setAttribute('class','toy-avatar')
    
    let p = document.createElement('p')
    toyCard.append(p)
    p.textContent = `${toy.likes} Likes`

    let button = document.createElement('button')
    toyCard.append(button)
    button.textContent = 'Like'
    button.setAttribute('class','like-btn')
    button.setAttribute('id',`${toy.id}`)
    }))
  })

document.addEventListener('click',function(e) {
  const target = e.target.closest('.like-btn')
  fetch(`http://localhost:3000/toys/${target.id}`)
  .then(response => response.json())
  .then(function(data2){
    let currentLikes = data2.likes
    currentLikes++
    fetch(`http://localhost:3000/toys/${target.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        'likes': currentLikes
      })
    })
    .then(response => response.json())
  })
})

const configurationObject = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    'name': 'Jessie',
    'image': 'https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist',
    'likes': 0
  })
}

let form = document.getElementById('form')
form.addEventListener('submit', function(e) {
  e.preventDefault()
  fetch('http://localhost:3000/toys', configurationObject)
  .then(response => response.json())
  })
