import React, { useState,useEffect } from "react";
import withAPIFunctionality from "./withAPIFunctionality";
function PokemonComponent(props) {
	const [numOfPokemon, setNumOfPokemon] = useState(10);
    // 
    useEffect(() => {
        props.loadData(
			`https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemon}`
		);
        return () => {
            
        }
    },[numOfPokemon])
	return (
		<div>
			<input
				type="number"
				placeholder="Number of pokemon"
				value={numOfPokemon}
				onChange={(e) => setNumOfPokemon(e.target.value)}
			/>
            <button onClick={() => {
                props.loadData(
					`https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemon}`
				);
            }}>Get pokemon</button>

			{props.response.results &&
				props.response.results.map((pokemon) => (
					<h2 key={pokemon.name}>{pokemon.name}</h2>
				))}
		</div>
	);
}

export default withAPIFunctionality(PokemonComponent);
