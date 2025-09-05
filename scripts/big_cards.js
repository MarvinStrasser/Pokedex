async function showBigCard(index) {
    let pokemon = allPokemon[index];
    let detail = await addPokemonStatsAtIndex(pokemon.url);
    // show
    document.getElementById('big_main_section').style.display = 'flex';
    // add data
    document.getElementById('big_img').src = detail.sprites.other["official-artwork"].front_default;
    document.getElementById('big_name').innerText = capitalizeFirstLetter(detail.name);
    document.getElementById('big_height').innerText = "Height: " + detail.height;
    document.getElementById('big_weight').innerText = "Weight: " + detail.weight;
    // abilities
    document.getElementById('ability_one').innerText = detail.abilities[0]?.ability.name || '';
    document.getElementById('ability_two').innerText = detail.abilities[1]?.ability.name || '';
    //types
    document.getElementById()

    setBigCardColor(detail);
}

function closeBigCard() {
    document.getElementById('big_main_section').style.display = 'none';
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setBigCardColor(detail) {
    let firstType = detail.types[0].type.name;
    let bigCard = document.getElementById('big_card');

    bigCard.className = 'big_pokemon_card'; // reset
    bigCard.classList.add(`bg_${firstType}`);
}