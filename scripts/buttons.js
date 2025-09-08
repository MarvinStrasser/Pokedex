let shownPokemon = 0;

function cardTemplate() {
    return `
    <div class="pokemon_card">
      <img src="" alt="">
      <div class="name"></div>
      <div class="types"><span></span><span></span></div>
    </div>
  `;
}

function addEmptyCards(n) {
    let container = document.getElementById("poke_card_container");
    for (let i = 0; i < n; i++) {
        container.innerHTML += cardTemplate();
    }
}

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

function showLoading(isLoading) {
    const btn = document.getElementById("loadMoreBtn");
    const spin = document.getElementById("spinner");
    const label = document.getElementById("label");

    if (isLoading) {
        btn.disabled = true;
        spin.classList.remove("d-none");
    } else {
        btn.disabled = false;
        spin.classList.add("d-none");
    }
}

function endOfList() {
    const btn = document.getElementById("loadMoreBtn");
    if (btn) {
        btn.disabled = true;
        btn.innerText = "No more Pokémon";
    }
}

async function loadMorePokemonBtn() {
    toggleOverlay(true);

    const loadMore = 20;
    addEmptyCards(loadMore);

    for (let i = shownPokemon; i < shownPokemon + loadMore; i++) {
        const card = document.getElementsByClassName('pokemon_card')[i];
        if (card) card.onclick = () => showBigCard(i);
    }
    await addApiInfoFrom(shownPokemon, loadMore);
    shownPokemon += loadMore;

    toggleOverlay(false);
}

function toggleOverlay(show) {
    const overlay = document.getElementById("loadingOverlay");
    if (!overlay) return;

    if (show) {
        overlay.classList.remove("d-none");
    } else {
        overlay.classList.add("d-none");
    }
}

function clickCloseOverlay(event, element){
    if(event.target === element){
        closeBigCard();
    }
}