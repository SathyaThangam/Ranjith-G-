import React,{Suspense,lazy} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CircularLoaderComponent from './components/CircularLoaderComponent';

const HomePage = lazy(() => import("./HomePage/index"));
const TicketPage = lazy(() => import("./TicketPage/index"));
const DisplayTicketsPage = lazy(() => import("./DisplayTicketsPage/index"));


function Routes() {
	return (
		<Router>
			<div className="main-content">
				<Suspense fallback={<CircularLoaderComponent />}>
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/tickets" component={TicketPage} />
						<Route
							path="/vieworders"
							component={DisplayTicketsPage}
						/>
						<Route component={HomePage} />
					</Switch>
				</Suspense>
			</div>
		</Router>
	);
}

export default Routes;
