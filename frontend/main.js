let renderPets = async()=>{
  let response = await axios.get('http://localhost:1337/api/pets?populate=*');

  let pets = response.data.data; 
  console.log(pets)

  pets.forEach(pet => {
    let name = document.createElement('p');
    let candies = document.createElement('p');
    let portrait = document.createElement('img');

    if(pet.attributes.portrait.data){
      portrait.src = "http://localhost:1337" + pet.attributes.portrait.data.attributes.url;
    }
    
    candies.innerText = 'Favorite candies: ';
    name.innerText = `Name: ${pet.attributes.name}`;

    pet.attributes.favorite_candies.data.forEach(candy =>{
      candies.innerText += candy.attributes.type + ', ';
    })

    document.querySelector('#petContainer').append(name, candies, portrait);
    
  });
}
renderPets();

let addPet = async ()=>{
  let name = document.querySelector('#name').value;
  let favorite_candies = document.querySelector('#candies').value;

  //hämta image från filuppladdning
  let img = document.querySelector('#portraitImg').files;

  //vi måste skapa formdata för att det ska funka
  let imgData = new FormData();
  
  //appenda själva bilden till formdataobjektet. key+value
  imgData.append('files', img[0]);

  //ladda upp bilden
  await axios.post('http://localhost:1337/api/upload/', imgData).then(response => {

    axios.post('http://localhost:1337/api/pets', {
      data: {
        name : name, 
        favorite_candies: [favorite_candies], // det måste vara en array med id:s på relationer
        portrait: response.data[0].id
      }
    })
  })
}
