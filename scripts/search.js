//Searchbar filter
async function searchPokemon() {
//get access to ID´s
  const a = document.getElementById("search_bar").value.toLowerCase();//get Text, moves to lowerCase
  const b = document.getElementById("poke_card_container");//get information from poke_card
  const c = document.getElementById("loadMoreBtn");//access to btn for more pokemon
//set length and set btn to inline block
  if (a.length < 3) { if (c) c.style.display = "inline-block";//search only < 3 letters, standard styling
    b.innerHTML = ""; addEmptyCards(shownPokemon); await addApiInfoFrom(0, shownPokemon); return; }//empty container, add empty card,add info from API, gives return

  if (c) c.style.display = "none";//hide btn
  const hits = allPokemon.filter(p => p.name.toLowerCase().includes(a));//search in allPokemons, check if the type is in a name
  await displaySearch(hits);//shows final result
}

async function displaySearch(list) {
  const d = document.getElementById("poke_card_container");//get acces to poke_card container
  d.innerHTML = list.length ? "" : "<p>No Pokemon found</p>";//if nothing found.Show error message
  
  
  addEmptyCards(list.length);//add so many card, like results
  for (let i = 0; i < list.length; i++) {
    const e = await addPokemonStatsAtIndex(list[i].url);//load data from api for the cards
    const img = e?.sprites?.other?.["official-artwork"]?.front_default || e?.sprites?.front_default || "";
    loadImage(img, i); loadName(e.name, i); loadTypes(e, i);
  }
}