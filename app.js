const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types, weight, abilities, height, stats }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)
    const abilityTypes = abilities.map(abilityInfo => abilityInfo.ability.name)
    const statsTypes = stats.map(statsInfo => statsInfo.stat.name)
    const statsValues = stats.map(valuesInfo => valuesInfo.base_stat)

    accumulator += `
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">>
                <li class="card ${elementTypes[0]}">
                    <h2 class="card-title">${id}. ${name}</h2>
                    <p class="card-subtitle">${elementTypes.join(' | ')}</p>
                    <img class="card-image" alt"${name}" src="https://img.pokemondb.net/sprites/home/normal/${name}.png">
                </li>
            </div>
            <div class="flip-card-back">
                <li class="card ${elementTypes[0]}">
                    <h2 class="card-title">${id}. ${name}</h2>
                    <p class="card-subtitle">Type: ${elementTypes[0]}</p>
                    <p class="card-subtitle">Weight: ${weight} - Height: ${height}</p>
                    <p class="card-subtitle">Abilities: ${abilityTypes.join(' | ')}</p>
                    <p class="card-subtitle">Stats:</p>
                    <div class="statsInfo"> 
                        <p class="card-subtitle">${statsTypes.join(' <br> ')}: </p>
                        <p class="card-subtitle">${statsValues.join(' <br> ')}</p>            
                    </div>
                </li>
            </div>
        </div>
    </div>
    `
    return accumulator
}, '')


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)