import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "Summoner Name",
            summonerName: "",
            accountId: "",
            matches: [],
            matchesCollection: {},
            champName: "",
            champNum: 0,
            getChampion: 0,
            showMatches: 0
        };
    }

    getAccountId() {
        //Gets the api based off of the summoner name provided
        fetch("/api/accountId/" + this.state.summonerName)
            .then(res => res.json())
            .then(data => this.setState({ accountId: data.accountId }));
    }

    getMatchHistory() {
        //this function will
        fetch("/api/matchHistory/" + this.state.accountId)
            .then(res => res.json())
            .then(data => this.setState({ matches: data, champNum: data[0].champion }));
    }

    getMatch(matchId) {
        //this function will
        fetch("/api/match/" + matchId)
            .then(res => res.json())
            .then(data => {
                let team = -1;
                for (let identity = 0; identity < 10; identity++) {
                    if (data.participantIdentities[identity].player.summonerName === this.state.summonerName) {
                        team = Math.floor((data.participantIdentities[identity].participantId - 1) / 5);
                        //console.log("Participant ID: ", data.participantIdentities[identity].participantId);
                    }
                }
                //console.log(team);
                this.setState(prevState => ({
                    matchesCollection: {
                        ...prevState.matchesCollection,
                        [matchId]: data.teams[team].win
                    }
                }));
            });
    }

    getMatches() {
        //console.log(Object.keys(this.state.matches));
        for (let index = 0; index < 10; index++) {
            this.getMatch(this.state.matches[index].gameId);
        }
        //console.log(matchesCollection);
        //setTimeout(() => console.log(matchesCollection), 3000);
    }

    getChampName() {
        //this function will
        fetch("/api/champName/" + this.state.champNum)
            .then(res => res.json())
            .then(data => {
                this.setState({ champName: data.champName });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.getChampion) {
            if (prevState.summonerName !== this.state.summonerName) {
                this.getAccountId();
            } else if (prevState.accountId !== this.state.accountId) {
                this.getMatchHistory();
            } else if (prevState.champName !== this.state.champName) {
                //hooray
            } else if (prevState.champNum !== this.state.champNum) {
                this.getChampName();
            } else if (prevState.matches !== this.state.matches) {
                //TODO open display match data nicely
            } else if (prevState.showMatches !== this.state.showMatches) {
                if (this.state.showMatches === 1) this.getMatches();
            }
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Project Home</h1>
                    <input
                        className="App-input"
                        type="text"
                        id="text"
                        value={this.state.text}
                        onChange={e => {
                            let regex = new RegExp("^[0-9a-zA-Z _.]+$");
                            if (regex.test(e.key)) {
                                //League of Legends Api
                                //  This function uses lol dev api to figure out the last played champion played by the user
                                //  The User will input thier IGN (in game name) which will then trigger an api search
                                this.setState({
                                    text: e.target.value
                                });
                            } else {
                                console.log("bad");
                            }
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                this.setState({
                                    getChampion: 1,
                                    summonerName: this.state.text
                                });
                            }
                        }}
                    />
                    <button
                        className="App-matches-button"
                        onClick={e => {
                            this.setState({ showMatches: this.state.showMatches ^ 1 });
                        }}
                    >
                        Button
                    </button>
                    {!this.state.showMatches ? (
                        <div className="App-details">
                            <p>{this.state.accountId ? this.state.accountId : "No Account ID"}</p>
                            <p>{this.state.summonerName ? this.state.summonerName : "No Summoner Name"}</p>
                            <p>{this.state.matches[0] ? this.state.matches[0].champion : "No Matches"}</p>
                            <p>{this.state.champName ? this.state.champName : "No Champion Name"}</p>
                        </div>
                    ) : (
                        <div className="App-matches">
                            {/* display matches */}
                            {Object.keys(this.state.matchesCollection).map(item => {
                                return <div>{this.state.matchesCollection[item]}</div>;
                            })}
                        </div>
                    )}
                </header>
            </div>
        );
    }
}

export default App;
