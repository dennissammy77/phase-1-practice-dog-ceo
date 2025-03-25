document.addEventListener('DOMContentLoaded',()=>{
    console.log('%c HI', 'color: firebrick');
    const dogBreedsImagesContainer = document.getElementById("dog-image-container");
    const dogBreedsContainer = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl).then(response=>response.json()).then((data)=>{
        console.log(data)
        data.message.map((img)=>{
            const dogImg = document.createElement('img');
            dogImg.src=img;
            dogBreedsImagesContainer.appendChild(dogImg)
        })
    }).catch((err)=>{
        console.error(err)
    });

    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];

    fetch(breedUrl).then(response=>response.json()).then((data)=>{
        console.log(data)
        allBreeds = Object.keys(data.message);
        displayBreeds(allBreeds)
    }).catch((err)=>{
        console.error(err)
    });

    function displayBreeds(breeds) {
        dogBreedsContainer.innerHTML = ''; // Clear existing list
        for (breed in breeds){
            const breedElement = document.createElement('li');
            breedElement.textContent=breeds[breed];

            dogBreedsContainer.appendChild(breedElement)
            breedElement.addEventListener('click', () => {
                breedElement.style.color = 'blue';
            });
        }
    }
    breedDropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));
        displayBreeds(filteredBreeds);
    });
})