let addToy = false;
const toyDataBase = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  fetch(toyDataBase)
  .then(response => response.json())
  .then(data => data.forEach(toys => toyCollection.appendChild(createCardContainer(toys))));
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
  
  function createCardContainer(toys) {
  
  const createDiv = document.createElement("div")
  createDiv.classList.add("card")
  const createHeader = document.createElement("h2")
  createHeader.textContent = toys.name
  const createImage = document.createElement("img")
  createImage.src = toys.image
  createImage.classList.add("toy-avatar")
  const createParagraph = document.createElement("p")
  createParagraph.textContent = toys.likes
  const createButton = document.createElement("button")
  createButton.addEventListener('click', (e) => updateLikes(e, createParagraph))
  createButton.textContent = "Like <3",
  createButton.classList.add("like-btn")
  createButton.setAttribute('id', toys.id)
  createDiv.append(createHeader, createImage, createParagraph, createButton)
  return createDiv
  
}

});

function addNewToy(){
  const toyInput = document.querySelector(".submit")
  
  toyInput.addEventListener('click', (e) => {
    e.preventDefault();
    const textInput = document.querySelector('[name = "name"]')
    const imageInput = document.querySelector('[name = "image"]')
    
    fetch(toyDataBase, {
     method: "POST", 
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
       name: textInput.value,
       image: imageInput.value,
       likes: 0
      })
      
    })
    .then(response => response.json())
    .then(newToy => createCardContainer(newToy))
  })
}

function updateLikes(e, p){ 
 
  let likeValue = +p.textContent   //can also use parseInt(), we are converting from string to number
  let imageId = e.target.id 
  console.log(typeof likeValue, likeValue)

  fetch(`http://localhost:3000/toys/${imageId}`, {
    method: "PATCH",
    headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
       likes: (likeValue + 1)
     })

    })
    .then(response => response.json())
    .then(()=> p.textContent = likeValue + 1)
    .catch((error) => {
      console.error('Error:', error);
    });
    // return p.textContent = likeValue + 1
  }