import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import CircularLoaderComponent from "./components/CircularLoaderComponent";
import "./css/CircularLoaderComponent.scss";
import HeaderComponent from "./Components/HeaderComponent";
import ProtectedRoute from "./Components/ProtectedRoute";
import Errorpage from "./pages/Errorpage";

const AuthenticateModalComponent = lazy(() =>
	import("./Components/AuthenticateModalComponent")
);

const CircularLoaderComponent = props => <div className="loader"></div>;
const BookingPage = lazy(() => import("./pages/BookingPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ViewTicketsPage = lazy(() => import("./pages/ViewTicketsPage"));
function Routes() {
	return (
		<Router>
			<HeaderComponent />
			<Suspense fallback={<CircularLoaderComponent />}>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<ProtectedRoute
						path="/viewtickets"
						exact
						component={ViewTicketsPage}
						redirect={"/login"}
					/>
					<Route
						path="/login"
						render={(props) => (
							<AuthenticateModalComponent {...props} />
						)}
					/>
					<Route path="/booking/:id" component={BookingPage} />
					{/* 404 Error page Should be last route of switch */}
					<Route component={Errorpage} />
				</Switch>
			</Suspense>
		</Router>
	);
}

export default Routes;
