let currentBigIndex = 0;
async function showBigCard(index) {
    currentBigIndex = index;
    let pokemon = allPokemon[index];
    let detail = await addPokemonStatsAtIndex(pokemon.url);

    document.getElementById('big_main_section').style.display = 'flex';
    document.getElementById('big_img').src = detail.sprites.other["official-artwork"].front_default;
    document.getElementById('big_name').innerText = capitalizeFirstLetter(detail.name);
    document.getElementById('big_height').innerText = "Height: " + detail.height;
    document.getElementById('big_weight').innerText = "Weight: " + detail.weight;
    document.getElementById('ability_one').innerText = detail.abilities[0]?.ability.name || '';
    document.getElementById('ability_two').innerText = detail.abilities[1]?.ability.name || '';
    setBigCardColor(detail);
    blockScrollBar(true);
}

function closeBigCard() {
    console.log('closeBigCard');
    document.getElementById('big_main_section').style.display = 'none';
    blockScrollBar(false);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setBigCardColor(detail) {
    let firstType = detail.types[0].type.name;
    let bigCard = document.getElementById('big_card');

    bigCard.className = 'big_pokemon_card';
    bigCard.classList.add(`bg_${firstType}`);
}

function blockScrollBar(lock) {
    if (lock) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
    }
}

function nextBigCard() {
    if (currentBigIndex >= allPokemon.length - 1) return;
    showBigCard(currentBigIndex + 1);
}

function prevBigCard() {
    if (currentBigIndex <= 0) return;
    showBigCard(currentBigIndex - 1);
}