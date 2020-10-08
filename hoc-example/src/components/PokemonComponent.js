import React, { useState,useEffect,Profiler } from "react";
import { onRenderCallBack } from "../helper";
import withAPIFunctionality from "./withAPIFunctionality";
function PokemonComponent(props) {
	const [numOfPokemon, setNumOfPokemon] = useState(10);
    // 
    useEffect(() => {
        props.loadData(
			`https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemon}`
		);  
    },[numOfPokemon])
	return (
		<Profiler id="PokemonComponent" onRender={onRenderCallBack}>
			<>
				<input
					type="number"
					placeholder="Number of pokemon"
					value={numOfPokemon}
					onChange={(e) => setNumOfPokemon(e.target.value)}
				/>
				{props.response.results &&
					props.response.results.map((pokemon) => (
						<h2 key={pokemon.name}>{pokemon.name}</h2>
					))}
			</>
		</Profiler>
	);
}

export default withAPIFunctionality(PokemonComponent);
