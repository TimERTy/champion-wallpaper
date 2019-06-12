import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MatchView from "./MatchView";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            text: "Summoner Name",
            summonerName: "",
            accountId: "",
            matches: [],
            matchCollection: [],
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
                let participantId = -1;
                for (let identity = 0; identity < 10; identity++) {
                    if (data.participantIdentities[identity].player.summonerName === this.state.summonerName) {
                        team = Math.floor((data.participantIdentities[identity].participantId - 1) / 5);
                        participantId = data.participantIdentities[identity].participantId;
                    }
                }
                //console.log("deaths: ", data.participants[participantId]["stats"]["deaths"]);
                this.setState({
                    matchCollection: [
                        ...this.state.matchCollection,
                        {
                            queueId: data.queueId,
                            win: data.teams[team].win,
                            champion: data.participants[participantId]["championId"],
                            championName: "",
                            kills: data.participants[participantId]["stats"]["kills"],
                            deaths: data.participants[participantId]["stats"]["deaths"],
                            assists: data.participants[participantId]["stats"]["assists"],
                            level: data.participants[participantId]["stats"]["champLevel"],
                            cs: data.participants[participantId]["stats"]["totalMinionsKilled"],
                            multikill: data.participants[participantId]["stats"]["largestMultiKill"]
                        }
                    ]
                });
            });
    }

    getMatches() {
        //console.log(Object.keys(this.state.matches));
        for (let index = 0; index < 10; index++) {
            this.getMatch(this.state.matches[index].gameId);
        }
        //console.log(matchCollection);
        //setTimeout(() => console.log(matchCollection), 3000);
    }

    getChampName(champNum) {
        //this function will
        fetch("/api/champName/" + champNum)
            .then(res => res.json())
            .then(data => {
                //this.setState({ champName: data.champName });
                return data.champName;
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.getChampion) {
            if (prevState.summonerName !== this.state.summonerName) {
                this.setState({ matchCollection: [] });
                this.getAccountId();
            } else if (prevState.accountId !== this.state.accountId) {
                this.getMatchHistory();
            } else if (prevState.champName !== this.state.champName) {
                //hooray
            } else if (prevState.champNum !== this.state.champNum) {
                //this.getChampName(this.state.champNum);
            } else if (prevState.matches !== this.state.matches) {
                //TODO open display match data nicely
                this.getMatches();
            } else if (prevState.showMatches !== this.state.showMatches) {
                if (this.state.showMatches === 1) this.getMatches();
            }
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {!this.state.showMatches ? <img src={logo} className="App-logo" alt="logo" /> : ""}
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
                            {Object.keys(this.state.matchCollection).map(item => {
                                return (
                                    <MatchView
                                        win={this.state.matchCollection[item].win}
                                        champion={this.state.matchCollection[item].champion}
                                        kills={this.state.matchCollection[item].kills}
                                        deaths={this.state.matchCollection[item].deaths}
                                        assists={this.state.matchCollection[item].assists}
                                        level={this.state.matchCollection[item].level}
                                        cs={this.state.matchCollection[item].cs}
                                        championIcon="Temp"
                                        multikill={this.state.matchCollection[item].multikill}
                                    />
                                );
                            })}
                        </div>
                    )}
                </header>
            </div>
        );
    }
}

export default App;
