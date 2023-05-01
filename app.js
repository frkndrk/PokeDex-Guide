const form = document.querySelector(".form")
const search = document.getElementById("search")
const findBtn = document.getElementById("find")
const pokeContanier = document.querySelector(".poke-container")

const pokemon_count = 151

const bg_color = {
  grass: '#8BD369',
  fire: '#FF603F',
  water: '#3399FF',
  bug: '#AABB22',
  normal: '#AAAA99',
  flying: '#9AA8FA',
  poison: '#B76EA4',
  electric: '#FFD34E',
  ground: '#E2C56A',
  fairy: '#F1A8EC',
  psychic: '#FF6EA4',
  fighting: '#C56E5C',
  rock: '#C5B679',
  dragon: '#7766EE',
  ice: '#66CCFF',
}

const fetchPokemons = async () => {
  for(let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i)
  }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCards(data)
}

const createPokemonCards = (pokemon) => {
  const pokemonId = pokemon.id.toString().padStart(3,'0')

  const pokeCardHtml = `
    <div class="poke-card" style="background-color: ${bg_color[pokemon.types[0].type.name]}">
        <div class="poke-image">
            <img src="https://img.pokemondb.net/sprites/home/normal/${pokemon.forms[0].name}.png" alt="Bulbasaur">
        </div>
        <div class="poke-info">
          <small>#${pokemonId}</small>
          <h2>${pokemon.name}</h2>
        </div>
        <div class="poke-property">
          <i class="fa-solid fa-flask"></i><span>${pokemon.base_experience} exp</span>
          <i class="fa-solid fa-weight-hanging"></i><span>${pokemon.weight} kg</span>
        </div>
        <div class="poke-type">
          <i class="fa-brands fa-uncharted"></i> ${pokemon.types[0].type.name}
        </div>
    </div>
  `
  pokeContanier.innerHTML += pokeCardHtml
}


findBtn.addEventListener("click", ()=> {
  form.classList.toggle("active")

})

search.addEventListener("input", (e)=> {
  const searchValue = search.value.toLowerCase()

  const pokeNames = document.querySelectorAll(".poke-info h2")

  pokeNames.forEach((pokename)=> {
    pokename.parentElement.parentElement.style.display ="block"

    if(!pokename.innerHTML.toLowerCase().includes(searchValue)) {
      pokename.parentElement.parentElement.style.display ="none"
    }
  })
})

fetchPokemons()




