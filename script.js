let allPokemon = [];
let currentPokemon = [];
let offset = 0;
let limit = 20;

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";

function onloadFunc() {
  loadData();
}

async function loadData() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    allPokemon = result.results;
    addApiInfoAtIndex()

  } catch (error) {
    console.error(error.message);
  }
}

async function addApiInfoAtIndex() {
  let cards = document.getElementsByClassName("pokemon_card");
  for (let i = 0; i < cards.length; i++) {
    let pokemon = allPokemon[i];
    let detail = await addPokemonStatsAtIndex(pokemon.url);
    let imgUrl = detail.sprites.other["official-artwork"].front_default;
    loadImage(imgUrl, i);
    loadName(detail.name, i);
    loadTypes(detail, i);
    cards[i].setAttribute("onclick", "showBigCard(" + i + ")");
  }
}

async function addPokemonStatsAtIndex(url) {
  const response = await fetch(url);
  const detail = await response.json();
  return detail;
}

function loadName(pokemonName, index) {
  let cards = document.getElementsByClassName("pokemon_card");
  let nameElement = cards[index].getElementsByClassName("name")[0];
  nameElement.innerText = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
}

function loadImage(pokemonImgUrl, index) {
  let cards = document.getElementsByClassName("pokemon_card");
  let imgElement = cards[index].getElementsByTagName("img")[0];
  imgElement.src = pokemonImgUrl;
}

function loadTypes(detail, index) {
  let cards = document.getElementsByClassName("pokemon_card");
  let typesElement = cards[index].getElementsByClassName("types")[0];

  typesElement.innerHTML = "";

  for (let j = 0; j < detail.types.length; j++) {
    let typeName = detail.types[j].type.name;
    typesElement.innerHTML += `<span class="bg_${typeName}">${typeName.charAt(0).toUpperCase() + typeName.slice(1)}</span>`;
  }

}

function loadName() {
  for (let i = 0; i < allPkms.length; i++) {
    document.getElementById('list').innerHTML += `<h1 class="bg_${allPkms[i].type}">${allPkms[i].name}</h1>`;
  }
}
