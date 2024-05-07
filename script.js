
let pokemonName;
let pokemonInfo;
let allPokemon = [];
let matchingPokemon = [];
let pokemonOffset = 0;


async function init() {
    await loadPokemon(pokemonOffset);
    await loadEvolve();
    await loadEvolveChain();
    renderPokemon();
}

async function loadPokemon(offset) {
   
        let url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let pokemonName = currentPokemon['results'];

        for (let i = 0; i < pokemonName.length; i++) {
            let element = pokemonName[i];
            let infoUrl = element['url'];
            let infoResponse = await fetch(infoUrl);
            let pokemonInfo = await infoResponse.json();
            allPokemon.push(pokemonInfo);
            renderPokemon();
        document.getElementById('loading-container').classList.add('d-none');
    }
}

async function loadMorePokemon() {
    pokemonOffset += 30;
    await loadPokemon(pokemonOffset);
    renderPokemon();
}

async function loadEvolve() {
    for (let j = 0; j < allPokemon.length; j++) {
        let species = allPokemon[j].species;
        let newUrl = species.url;
        let speciesResponse = await fetch(newUrl);
        let speciesUrl = await speciesResponse.json();
        allPokemon[j].evolve = speciesUrl;
    }
}

async function loadEvolveChain() {
    for (let k = 0; k < allPokemon.length; k++) {
        let evolve = allPokemon[k].evolve;
        let evolveUrl = evolve.evolution_chain.url;
        response = await fetch(evolveUrl);
        evolveChain = await response.json();
        allPokemon[k].evolution_chain = evolveChain;
    }
}


function renderPokemon() {
    let pokedex = document.getElementById('pokedex'); 
    pokedex.innerHTML = ''

    for (let j = 0; j < allPokemon.length; j++) {
        let eachPokemon = allPokemon[j];
        let pokemonImage = eachPokemon['sprites']['other']['dream_world']['front_default'];

        pokedex.innerHTML += generateHTMLForRenderPokemon(j,eachPokemon,pokemonImage);
    }
}

function closeInfoBox() {
    let infoBox = document.getElementById('info-box');
    infoBox.classList.add('d-none');
    document.getElementById('pokedex').classList.remove('d-none');
    document.getElementById('load-more-btn').classList.remove('d-none');
}

function openPokemonCard(index) {
    currentIndex = index;
    document.getElementById('pokedex').classList.add('d-none');
    document.getElementById('load-more-btn').classList.add('d-none');
    let infoBox = document.getElementById('info-box');
    infoBox.classList.remove('d-none');
    infoBox.innerHTML = generatePokemonCard(index);
    generateStats(index);
    pokemonTypes(index);
    
}

function pokemonTypes(index) {
    let types = allPokemon[index].types;
    let typesElement = document.getElementById('types');
    typesElement.innerHTML = '';

    for (let l = 0; l < types.length; l++) {
        let type = types[l].type.name;
        let typeColor = getTypeColor(type);
        typesElement.innerHTML += `<span class="each-type" style="background-color: ${typeColor};">${type}</span>`;
    }
}

function showEvolve(index) {
    let infoBox = document.getElementById('lower-info-div');
    infoBox.innerHTML = '';
    let evolutionChain = allPokemon[index].evolution_chain;
    let renderedPokemon = [];
    document.getElementById('evolve-btn').classList.add('highlight');
    document.getElementById('stat-btn').classList.remove('highlight');
    renderEvolutionChain(evolutionChain.chain, infoBox, renderedPokemon);
}

function renderEvolutionChain(chain, container, renderedPokemon) {
    let currentPokemon = chain.species.name;
    if (!renderedPokemon.includes(currentPokemon)) {

        let currentPokemonIndex = allPokemon.findIndex(pokemon => pokemon.name === currentPokemon);
        let currentPokemonImage = allPokemon[currentPokemonIndex].sprites.other.dream_world.front_default;
        container.innerHTML += /*html*/`
            <div class="evolution-stage">
                <img class="evolution-img" src="${currentPokemonImage}" alt="${currentPokemon}">
                <p>${currentPokemon}</p>
            </div>`;
        renderedPokemon.push(currentPokemon);
        ifEvolutionChain(chain, container, renderedPokemon);
    }
}

function ifEvolutionChain(chain, container, renderedPokemon) {
    if (chain.evolves_to.length > 0) {
        container.innerHTML += `<div class="evolution-arrow">&#8594;</div>`;
        for (let i = 0; i < chain.evolves_to.length; i++) {

            renderEvolutionChain(chain.evolves_to[i], container, renderedPokemon);
            if (i < chain.evolves_to.length - 1) {
                container.innerHTML += `<div class="evolution-arrow">&#8594;</div>`;
            }
        }
    }
}

function nextPokemon(i) {
    if (i < allPokemon.length - 1) {
        currentIndex = i + 1;
    }else {
        currentIndex = 0;
    }
    openPokemonCard(currentIndex);
}

function prevPokemon(i) {
    if (i > 0) {
        currentIndex = i - 1;
    } else {
        currentIndex = allPokemon.length - 1;
    }
    openPokemonCard(currentIndex);
}

let searchTimeout;
function searchForPokemon() {
    clearTimeout(searchTimeout);
    let input = document.getElementById('search-input').value;
    if (input === '') {
        matchingPokemon = [];
        renderPokemon()
        return;
    }
    searchTimeout = setTimeout(function () {
        matchingPokemon = [];
        for (let i = 0; i < allPokemon.length; i++) {
            let pokemon = allPokemon[i];
            let isPokemonInMatching = matchingPokemon.some(matchingPokemon => matchingPokemon.name === pokemon.name);
            if (pokemon.name.includes(input) && !isPokemonInMatching) {
                matchingPokemon.push(pokemon);
            }
        }
        renderMatchingPokemon();
    }, 300);
}

function renderMatchingPokemon() {
    let pokedexNew = document.getElementById('pokedex');
    pokedexNew.innerHTML = '';
    for (let k = 0; k < matchingPokemon.length; k++) {
        let searchedPokemon = matchingPokemon[k];
        let pokemonImage = searchedPokemon['sprites']['other']['dream_world']['front_default'];
        pokedexNew.innerHTML +=  generateHTMLForRenderMatchingPokemon(k,searchedPokemon,pokemonImage);
    }
}

