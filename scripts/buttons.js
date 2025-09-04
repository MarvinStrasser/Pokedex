let shownPokemon = 0;

// HTML Code for new empty cards after onclick Btn
function cardTemplate() {
    return `
    <div class="pokemon_card">
      <img src="" alt="">
      <div class="name"></div>
      <div class="types"><span></span><span></span></div>
    </div>
  `;
}

// add new empty cards below
function addEmptyCards(n) {
    let container = document.getElementById("poke_card_container");
    for (let i = 0; i < n; i++) {
        container.innerHTML += cardTemplate();
    }
}

// fill startIndex genau count Karten mit Daten aus allPokemon
async function addApiInfoFrom(startIndex, count) {
    let cards = document.getElementsByClassName("pokemon_card");
    for (let j = 0; j < count; j++) {
        let i = startIndex + j;
        let pokemon = allPokemon[i];
        if (!pokemon || !cards[i]) return; 

        let detail = await addPokemonStatsAtIndex(pokemon.url);
        let imgUrl = detail.sprites.other["official-artwork"].front_default;

        loadImage(imgUrl, i);
        loadName(detail.name, i);
        loadTypes(detail, i);
    }
}

// toggle between normal btn, and loading overlay
function showLoading(isLoading) {
    const btn = document.getElementById("loadMoreBtn");
    const spin = document.getElementById("spinner");
    const label = document.getElementById("label");

    if (isLoading) {
        btn.disabled = true;
        spin.classList.remove("d-none");
        label.innerText = "Loading...";
    } else {
        btn.disabled = false;
        spin.classList.add("d-none");
        label.innerText = "Click here for more";
    }
}

// if all pokemon loaded, button will be deactivated
function endOfList() {
    const btn = document.getElementById("loadMoreBtn");
    if (btn) {
        btn.disabled = true;
        btn.innerText = "No more Pokémon";
    }
}

// Hauptfunktion für den Button
async function loadMorePokemonBtn() {
    toggleOverlay(true);   // show overlay

    addEmptyCards(20);
    await addApiInfoFrom(shownPokemon, 20);
    shownPokemon += 20;

    toggleOverlay(false);
}

//toggle loading overlay
function toggleOverlay(show) {
    const overlay = document.getElementById("loadingOverlay");
    if (!overlay) return;

    if (show) {
        overlay.classList.remove("d-none");
    } else {
        overlay.classList.add("d-none");
    }
}