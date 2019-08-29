import React, { Suspense, lazy } from "react";
import "./MatchHistory.css";

import Loading from "../components/Loading";
const MatchView = lazy(() => import("../components/MatchView"));

const host = "http://ec2-54-206-45-161.ap-southeast-2.compute.amazonaws.com";
const port = 5555;

class MatchHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "My API Parser (LoL)",
            text: "Summoner Name",
            summonerName: "",
            accountId: "",
            matches: [],
            matchCollection: [],
            showMatches: 0,
            numMatches: 10
        };
    }

    async getAccountId() {
        //Gets the api based off of the summoner name provided
        await fetch(host + ":" + port + "/api/accountId/" + this.state.summonerName)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ accountId: data.accountId, summonerName: data.name }, () => this.getMatchHistory());
            });
    }

    async getMatchHistory() {
        //this function will
        await fetch(host + ":" + port + "/api/matchHistory/" + this.state.accountId)
            .then(res => res.json())
            .then(data => this.setState({ matches: data, champNum: data[0].champion }, () => this.getMatches()));
    }

    async getMatch(matchId) {
        //this function will
        await fetch(host + ":" + port + "/api/match/" + matchId)
            .then(res => res.json())
            .then(data => {
                let team = -1;
                let participantId = -1;
                for (let identity = 0; identity < 10; identity++) {
                    console.log(data.participantIdentities[identity].player.summonerName, this.state.summonerName);
                    if (data.participantIdentities[identity].player.summonerName === this.state.summonerName) {
                        team = Math.floor((data.participantIdentities[identity].participantId - 1) / 5);
                        participantId = data.participantIdentities[identity].participantId;
                    }
                }
                //console.log("deaths: ", data.participants[participantId]["stats"]["deaths"]);
                if (team === -1) console.log("The team has not been found.");
                this.setState({
                    matchCollection: [
                        ...this.state.matchCollection,
                        {
                            queueId: data.queueId,
                            win: data.teams[team].win,
                            champion: data.participants[participantId - 1]["championId"],
                            championName: "",
                            kills: data.participants[participantId - 1]["stats"]["kills"],
                            deaths: data.participants[participantId - 1]["stats"]["deaths"],
                            assists: data.participants[participantId - 1]["stats"]["assists"],
                            level: data.participants[participantId - 1]["stats"]["champLevel"],
                            cs: data.participants[participantId - 1]["stats"]["totalMinionsKilled"],
                            multikill: data.participants[participantId - 1]["stats"]["largestMultiKill"],
                            timestamp: data.gameCreation
                        }
                    ]
                });
            });
    }

    getMatches() {
        this.setState({ matchCollection: [] }, () => {
            for (let index = 0; index < this.state.numMatches; index++) {
                this.getMatch(this.state.matches[index].gameId);
            }
        });
    }

    async getChampName(champNum) {
        //this function will
        await fetch(host + ":" + port + "/api/champName/" + champNum)
            .then(res => res.json())
            .then(data => {
                return data.champions;
            });
    }

    render() {
        let that = this;
        return (
            <div className="MatchHistory">
                <h1>{this.state.title}</h1>
                <input
                    className="MatchHistory-input"
                    type="text"
                    id="text"
                    value={this.state.text}
                    onChange={e => {
                        let regex = new RegExp("^[0-9a-zA-Z _.]+$");
                        if (regex.test(e.key)) {
                            //League of Legends Api
                            //  This function uses lol dev api to figure out the last played champion played by the user
                            //  The User will input their IGN (in game name) which will then trigger an api search
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
                                () => this.getAccountId()
                            );
                            if (!this.state.showMatches) this.setState({ showMatches: 1 });
                        }
                    }}
                />
                <span className="MatchHistory-matches-above-span" />
                {!this.state.showMatches ? (
                    <div className="MatchHistory-details">
                        <p>{this.state.accountId ? this.state.accountId : "No Account ID"}</p>
                        <p>{this.state.summonerName ? this.state.summonerName : "No Summoner Name"}</p>
                        <p>{this.state.matches[0] ? this.state.matches[0].champion : "No Matches"}</p>
                    </div>
                ) : (
                    <div className="MatchHistory-matches">
                        {/* display matches */}
                        {this.state.matchCollection.length >= this.state.numMatches ? "" : <Loading />}
                        {Object.keys(this.state.matchCollection)
                            .sort(function(a, b) {
                                return that.state.matchCollection[b].timestamp - that.state.matchCollection[a].timestamp;
                            })
                            .map(item => {
                                return (
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <MatchView
                                            win={that.state.matchCollection[item].win}
                                            champion={that.state.matchCollection[item].champion}
                                            kills={that.state.matchCollection[item].kills}
                                            deaths={that.state.matchCollection[item].deaths}
                                            assists={that.state.matchCollection[item].assists}
                                            level={that.state.matchCollection[item].level}
                                            cs={that.state.matchCollection[item].cs}
                                            championIcon="Temp"
                                            multikill={that.state.matchCollection[item].multikill}
                                            timestamp={that.state.matchCollection[item].timestamp}
                                        />
                                    </Suspense>
                                );
                            })}
                    </div>
                )}
            </div>
        );
    }
}

export default MatchHistory;
