function generatePokemonCard(i) {
  let selectedPokemon;
  if (matchingPokemon.length === 0) {
    selectedPokemon = allPokemon;
  } else {
    selectedPokemon = matchingPokemon;
  }
  return /*html*/ `
  <div class="wrapper">
        <div class="upper-info-div">
        <div class="upper-info-div-left">
        <img class="close-img" title="close" onclick="closeInfoBox()" src="./img/close_white_24dp.svg" alt="">

            <div class="img"><img src="${selectedPokemon[i]["sprites"]["other"]["dream_world"]["front_default"]}" alt=""></div>
            <div class="id">#${selectedPokemon[i]["id"]}</div>
            <div class="info-box-btn">
               <div><img class="arrow" onclick="prevPokemon(${i})" src="./img/arrow_back_white_24dp.svg" alt=""></div>
               <div class="info-btn-info-box"><button onclick="showEvolve(${i})" id="evolve-btn" class="show-info">Evolve</button>
                    <button onclick="generateStats(${i})" id="stat-btn" class="show-info highlight">Stats</button></div>
              <div><img class="arrow" onclick="nextPokemon(${i})" src="./img/arrow_forward_white_24dp.svg" alt=""></div>
            </div>
        </div>
        <div class="upper-info-div-right">
            <div class="name"><h1>${selectedPokemon[i]["name"]}</h1></div>
            <div class="desc-text">${selectedPokemon[i].evolve.flavor_text_entries[1].flavor_text}</div>
            <div id="types"></div>
            <div class="data">
                <span>height: ${selectedPokemon[i]["height"].toFixed(1)}</span>
                <span>weight: ${selectedPokemon[i]["weight"].toFixed(1)}</span>
            </div>
        </div>

        
        </div>
        
        <div id="lower-info-div" class="lower-info-div">
        
        </div>
        </div>`;
}

function generateHTMLForRenderPokemon(j, eachPokemon, pokemonImage) {
  return /*html*/ ` 
        <div onclick="openPokemonCard(${j})" id="pokemon-card" class="main-pokemon-card">
            <div class="headline">
                <h1 id="pokemon-name${j}">${eachPokemon["name"]}</h1>
                <p><b>#${eachPokemon["id"]}</b></p>
            </div>
            <img class="small-img" src="${pokemonImage}" alt="pokemon">
        </div>`;
}

function generateHTMLForRenderMatchingPokemon(k, searchedPokemon, pokemonImage) {
  return /*html*/ ` 
    <div onclick="openPokemonCard(${k})" id="pokemon-card" class="main-pokemon-card">
        <div class="headline">
            <h1 id="pokemon-name${k}">${searchedPokemon["name"]}</h1>
            <p><b>#${searchedPokemon["id"]}</b></p>
        </div>
        <img class="small-img" src="${pokemonImage}" alt="pokemon">
    </div>`;
}

function getTypeColor(type) {
  let typeColors = {
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
  };
  return typeColors[type] || "#FFFFFF";
}
