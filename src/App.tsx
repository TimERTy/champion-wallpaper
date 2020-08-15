import React from "react";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import { Home, MatchHistory, Page } from "./pages";

const App: React.FC = () => {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<div className="App-Buttons">
						{
							[ "Home", "MatchHistory", "Page" ]
								.map( ( page ) => (
									<Link
										className={ "App-Button-" + page }
										to={ page.toLowerCase() }
									>
										{ page }
									</Link>
								) )
						}
					</div>
				</header>
				<Switch>
					<Route path="/page">
						<Page />
					</Route>
					<Route path="/matchhistory">
						<MatchHistory />
					</Route>
					<Redirect from="/home" to="/" />
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
