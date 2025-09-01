let allPokemon = [];
let currentPokemon = [];
let offset = 0;
let limit = 20;

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";

function onloadFunc() {
    loadData();
}

//Get Pokemon from API (MDM)
async function loadData() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    allPokemon = result.results

  } catch (error) {
    console.error(error.message);
  }
}

// get Names from Pokemon
function renderNames(){
    for(let i = 0; i > allPokemon.length; i++) {
        document.getElementById('').innerHTML += `<h2>${allPokemon[i]}</h2>`
    }
}