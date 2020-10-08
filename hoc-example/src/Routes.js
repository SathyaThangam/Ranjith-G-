import { BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom";

import React from 'react'
import PokemonComponent from "./components/PokemonComponent";
import JSONplaceholderComponent from "./components/JSONplaceholderComponent";
// import PokemonComponent from "./norm-components/PokemonComponent";
// import JSONplaceholderComponent from "./norm-components/JSONplaceholderComponent";
import "./css/Routes.css";
function Routes() {
    return (
		<Router>
            <div className="header">
               <NavLink className="link" to="/pokemon">pokemon</NavLink>
               <NavLink className="link" to="/users">users</NavLink>
               <NavLink className="link" to="/">home</NavLink>
            </div>
			<Switch>
				<Route path="/" exact render={() => <div><h2>Home</h2></div>} />
				<Route path="/pokemon" component={PokemonComponent} />
				<Route path="/users" component={JSONplaceholderComponent} />
				<Route render={() => <div>Error</div>} />
			</Switch>
		</Router>
	);
}

export default Routes
