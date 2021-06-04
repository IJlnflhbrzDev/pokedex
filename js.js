const poke_container = document.getElementById('poke_container');
const poke_detail_container = document.getElementById('poke_detail_container');

// LENGTH POKEMON (OPSIONAL)
const pokemons_number = 25;

// COLOR THEMES
const colors = {
	fire: '#fd457c',
	grass: '#1ecea2',
	electric: '#ffc107',
	water: '#77BCFD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#9d1300',
	bug: '#1ecea2',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#9d1300',
	fighting: '#E6E0D4',
	normal: '#800080'
};


const main_types = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

const getDetailPokemon = async url => {
	const res = await fetch(url);
	const pokemonDetail = await res.json();
	createDetailPokemonCard(pokemonDetail);
}

async function createDetailPokemonCard(pokemon) {

	const pokemonEl = document.createElement('div');
	pokemonEl.setAttribute("id", `detail/${pokemon.name}/${pokemon.id}`);
	const isDdefaultPokemon = pokemon.varieties[0].pokemon.url;
	fetch(isDdefaultPokemon)
		.then(resJson => resJson.json())
		.then(item => {
			document.getElementById(`myTabContent${item.id}`).innerHTML = `
		 	<div class="tab-pane fade show active" id="about${pokemon.id}" role="tabpanel" aria-labelledby="home-tab">
			 	<ul class="list-group list-group-flush">
					<li class="list-group-item">
						<span class="mr-5 text-muted">Species</span>
						<span class=" font-weight-bold text-capitalize">${item.species.name}</span>
					</li>
					<li class="list-group-item">
						<span class="mr-5 text-muted">Height</span>
						<span class=" font-weight-bold text-capitalize">${item.height}</span>
					</li>
					<li class="list-group-item">
						<span class="mr-5 text-muted">Weight</span>
						<span class=" font-weight-bold text-capitalize">${item.weight}</span>
					</li>
					<li class="list-group-item">
						<span class="mr-5 text-muted">Abilities</span>
						<span class=" font-weight-bold text-capitalize">
							${item.abilities[0].ability.name},
							${item.abilities[1].ability.name}
						</span>
					</li>




					<h6 style="margin-left: 16px;margin-top: 14px;font-weight: bold; font-size:21px;">Breeding</h6>
					<li class="list-group-item gender">
						<span class="mr-5 text-muted">Gender</span>
						<span class="gende_value"></span>
					</li>
					<li class="list-group-item eggGroups">
						<span class="mr-5 text-muted">Egg Groups</span>
					</li>
					<li class="list-group-item eggCycle">
						<span class="mr-5 text-muted">Egg Cycle</span>
						<span text-muted">Grass</span>
					</li>

				</ul>
			</div>
			<div class="tab-pane fade" id="Base-stats" role="tabpanel" aria-labelledby="Base-stats-tab">
				<ul class="list-group list-group-flush">
					<li class="list-group-item eggCycle">
						<span class="mr-5 text-muted">Hp</span>
						<span text-muted">${item.stats[0].base_stat}</span>
					</li>
					<h6 style="margin-left: 16px;margin-top: 14px;font-weight: bold; font-size:21px;">Type defeneses</h6>

				</ul>
			</div>
		 `

			console.log(item);
			//  GET EGG
			const Egg = async item => await fetch(item.species.url).then(resJson => resJson.json()).then(item => {
				document.querySelector('.eggGroups').innerHTML += `	<span class=" font-weight-bold text-capitalize">${item.egg_groups[0].name}</span>`
			})

			Egg(item)


		});

	const PokemonsTemplateDetail = `
					<div class="row flex-column">
							<div class="col-6">
								<div class="card pokemon_img ${pokemon.color.name}"
									style="width: 30rem; border-radius:30px 30px 0 0 ;">
									<div class="card-body overflow-hidden text-white">
										<div class="row justify-content-between align-items-center">
											<div class="col-6">
												<h5 class="card-title text-capitalize">${pokemon.name}</h5>
												<div class="type">
													<span>${pokemon.name}</span>
												</div>
											</div>
											<div class="col-6 text-right font-weight-bold">
												<span>#00${pokemon.id}</span>
											</div>
											<div class="col d-flex justify-content-center align-items-center">
												<img src="https://icon-library.com/images/pokeball-icon-transparent/pokeball-icon-transparent-5.jpg"
													class="w-75 text-white pokeball">
												<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" class="w-50"
													style="z-index: 999;">
											</div>
										</div>

									</div>
								</div>
							</div>
							<div class="col-6">
								<div class="card pokemon_detail" style="width: 30rem;">
									<div class="card-body">
										<ul class="nav nav-tabs border-0" id="myTab" role="tablist">
											<li class="nav-item" role="presentation">
												<a class="nav-link active" id="about-tab" data-toggle="tab" href="#about${pokemon.id}" role="tab" aria-controls="about" aria-selected="true">About</a>
											</li>
											<li class="nav-item" role="presentation">
												<a class="nav-link" id="base-stats-tab" data-toggle="tab" href="#Base-stats" role="tab" aria-controls="Base-stats" aria-selected="false">Base stats</a>
											</li>
										</ul>
										<div class="tab-content" id="myTabContent${pokemon.id}">
											<div class="tab-pane fade " id="about${pokemon.id}" role="tabpanel" aria-labelledby="home-tab">Hello 1</div>
											<div class="tab-pane fade" id="Base-stats" role="tabpanel" aria-labelledby="Base-stats-tab">Hello 2</div>
										</div>
									</div>
								</div>
							</div>
						</div>

    ` ;

	// MEMBERIKAN GAMBAR PADA SETIAP CARD POKEMON
	pokemonEl.innerHTML = PokemonsTemplateDetail;
	poke_detail_container.append(pokemonEl)

}


function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('article');
	pokemonEl.classList.add('pokemon');

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const species = pokemon.species.url;


	const color = colors[type];
	// MEMBERIKAN GAMBAR PADA SETIAP CARD POKEMON
	pokemonEl.style.backgroundColor = color;

	const PokemonsTemplate = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
        <div class="info">
            <h3 class="name" onclick='getDetailPokemon("${(species)}")'>
		  	<a href="#detail/${name}/${pokemon.id}">${name}</a>
		  </h3>
            <div class="type">
                    <span>${type}</span>
            </div>
        </div>
    `;
	pokemonEl.innerHTML = PokemonsTemplate;
	poke_container.appendChild(pokemonEl);
}



fetchPokemons();