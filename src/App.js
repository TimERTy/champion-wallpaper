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
            getSummonerData: 0,
            showMatches: 0
        };
    }

    getAccountId() {
        //Gets the api based off of the summoner name provided
        fetch("/api/accountId/" + this.state.summonerName)
            .then(res => res.json())
            .then(data => this.setState({ accountId: data.accountId }, this.getMatchHistory()));
    }

    getMatchHistory() {
        //this function will
        fetch("/api/matchHistory/" + this.state.accountId)
            .then(res => res.json())
            .then(data => this.setState({ matches: data, champNum: data[0].champion }, this.getMatches()));
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
        for (let index = 0; index < 10; index++) {
            this.getMatch(this.state.matches[index].gameId);
        }
    }

    getChampName(champNum) {
        //this function will
        fetch("/api/champName/" + champNum)
            .then(res => res.json())
            .then(data => {
                return data.champName;
            });
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
                                this.setState(
                                    {
                                        summonerName: this.state.text,
                                        matchCollection: [],
                                        matches: []
                                    },
                                    this.getAccountId()
                                );
                            }
                        }}
                    />
                    <button
                        className="App-matches-button"
                        onClick={e => {
                            this.setState({ showMatches: this.state.showMatches ^ 1 });
                            if (this.state.showMatches === 1) this.getMatches();
                        }}
                    >
                        Button
                    </button>
                    {!this.state.showMatches ? (
                        <div className="App-details">
                            <p>{this.state.accountId ? this.state.accountId : "No Account ID"}</p>
                            <p>{this.state.summonerName ? this.state.summonerName : "No Summoner Name"}</p>
                            <p>{this.state.matches[0] ? this.state.matches[0].champion : "No Matches"}</p>
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
