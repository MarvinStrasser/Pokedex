
async function searchPokemon() {
  const searchFilter = document.getElementById("search_bar").value.toLowerCase();
  const PkmCard = document.getElementById("poke_card_container");
  const btn = document.getElementById("loadMoreBtn");

  if (searchFilter.length < 3) {
    if (btn) btn.style.display = "inline-block";
    PkmCard.innerHTML = ""; addEmptyCards(shownPokemon); await addApiInfoFrom(0, shownPokemon); return;
  }

  if (btn) btn.style.display = "none";
  const hits = allPokemon.filter(p => p.name.toLowerCase().includes(searchFilter));
  await displaySearch(hits);
}

async function displaySearch(list) {
  const PkmCardList = document.getElementById("poke_card_container");
  PkmCardList.innerHTML = list.length ? "" : "<p>No Pokemon found</p>";


  addEmptyCards(list.length);
  for (let i = 0; i < list.length; i++) {
    const PkmStats = await addPokemonStatsAtIndex(list[i].url);
    const img = PkmStats?.sprites?.other?.["official-artwork"]?.front_default || e?.sprites?.front_default || "";
    loadImage(img, i); loadName(PkmStats.name, i); loadTypes(PkmStats, i);
    const cards = document.getElementsByClassName("pokemon_card");
    cards[i].setAttribute("onclick", "showBigCard(" + allPokemon.indexOf(list[i]) + ")");
  }
}