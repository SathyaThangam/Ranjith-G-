import React, { useState, useEffect, Profiler } from "react";
import { onRenderCallBack,helperLoadData } from "../helper";
function PokemonComponent(props) {
	const [numOfPokemon, setNumOfPokemon] = useState(10);
	const [data, setData] = useState([]);

	useEffect(() => {
		helperLoadData(
			`https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemon}`
		).then(response => setData(response.results))
	}, [numOfPokemon]);
	return (
		<Profiler id="PokemonComponent-norm" onRender={onRenderCallBack}>
			<>
				<input
					type="number"
					placeholder="Number of pokemon"
					value={numOfPokemon}
					onChange={(e) => setNumOfPokemon(e.target.value)}
				/>
				{data &&
					data.map((pokemon) => (
						<h2 key={pokemon.name}>{pokemon.name}</h2>
					))}
			</>
		</Profiler>
	);
}

export default (PokemonComponent);
