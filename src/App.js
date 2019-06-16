import React, { Suspense, lazy } from "react";
import logo from "./logo.svg";
import "./App.css";

import Loading from "./components/Loading";
const Home = lazy(() => import("./pages/Home"));
const Page = lazy(() => import("./pages/Page"));
const MatchHistory = lazy(() => import("./pages/MatchHistory"));

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            page: "Home"
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-Buttons">
                        <button
                            className="App-Button-Home"
                            onClick={() => {
                                this.setState({ page: "Home" });
                            }}
                        >
                            Home
                        </button>
                        <button
                            className="App-Button-MatchHistory"
                            onClick={() => {
                                this.setState({ page: "MatchHistory" });
                            }}
                        >
                            MatchHistory
                        </button>
                        <button
                            className="App-Button-Page"
                            onClick={() => {
                                this.setState({ page: "Page" });
                            }}
                        >
                            OtherPage
                        </button>
                    </div>
                    <Suspense fallback={<Loading />}>
                        {/* This is the page switcher */}
                        {this.state.page === "Home" ? <Home /> : ""}
                        {this.state.page === "MatchHistory" ? <MatchHistory /> : ""}
                        {this.state.page === "Page" ? <Page /> : ""}
                    </Suspense>
                </header>
            </div>
        );
    }
}

export default App;
