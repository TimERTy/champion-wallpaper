import React, { Suspense, lazy } from "react";
import "./App.css";

import Loading from "./components/Loading";
import CodeView from "./components/CodeView";
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
                        {this.state.page === "Home" ? <CodeView code={"./pages/Home.js"} />: ""}
                        {this.state.page === "MatchHistory" ? <MatchHistory /> : ""}
                        {this.state.page === "MatchHistory" ? <CodeView code={"import React, { Suspense, lazy } from \"react\";\n" +
                        "import logo from \"../logo.svg\";\n" +
                        "import \"./MatchHistory.css\";\n" +
                        "\n" +
                        "import Loading from \"../components/Loading\";\n" +
                        "const MatchView = lazy(() => import(\"../components/MatchView\"));\n" +
                        "\n" +
                        "const host = \"http://ec2-54-206-45-161.ap-southeast-2.compute.amazonaws.com\";\n" +
                        "const port = 5555;\n" +
                        "\n" +
                        "class MatchHistory extends React.Component {\n" +
                        "    constructor(props) {\n" +
                        "        super(props);\n" +
                        "        this.state = {\n" +
                        "            title: \"My API Parser (LoL)\",\n" +
                        "            text: \"Summoner Name\",\n" +
                        "            summonerName: \"\",\n" +
                        "            accountId: \"\",\n" +
                        "            matches: [],\n" +
                        "            matchCollection: [],\n" +
                        "            showMatches: 0,\n" +
                        "            numMatches: 10\n" +
                        "        };\n" +
                        "    }\n" +
                        "\n" +
                        "    async getAccountId() {\n" +
                        "        //Gets the api based off of the summoner name provided\n" +
                        "        await fetch(host + \":\" + port + \"/api/accountId/\" + this.state.summonerName)\n" +
                        "            .then(res => res.json())\n" +
                        "            .then(data => {\n" +
                        "                console.log(data);\n" +
                        "                this.setState({ accountId: data.accountId, summonerName: data.name }, () => this.getMatchHistory());\n" +
                        "            });\n" +
                        "    }\n" +
                        "\n" +
                        "    async getMatchHistory() {\n" +
                        "        //this function will\n" +
                        "        await fetch(host + \":\" + port + \"/api/matchHistory/\" + this.state.accountId)\n" +
                        "            .then(res => res.json())\n" +
                        "            .then(data => this.setState({ matches: data, champNum: data[0].champion }, () => this.getMatches()));\n" +
                        "    }\n" +
                        "\n" +
                        "    async getMatch(matchId) {\n" +
                        "        //this function will\n" +
                        "        await fetch(host + \":\" + port + \"/api/match/\" + matchId)\n" +
                        "            .then(res => res.json())\n" +
                        "            .then(data => {\n" +
                        "                let team = -1;\n" +
                        "                let participantId = -1;\n" +
                        "                for (let identity = 0; identity < 10; identity++) {\n" +
                        "                    console.log(data.participantIdentities[identity].player.summonerName, this.state.summonerName);\n" +
                        "                    if (data.participantIdentities[identity].player.summonerName === this.state.summonerName) {\n" +
                        "                        team = Math.floor((data.participantIdentities[identity].participantId - 1) / 5);\n" +
                        "                        participantId = data.participantIdentities[identity].participantId;\n" +
                        "                    }\n" +
                        "                }\n" +
                        "                //console.log(\"deaths: \", data.participants[participantId][\"stats\"][\"deaths\"]);\n" +
                        "                if (team === -1) console.log(\"The team has not been found.\");\n" +
                        "                this.setState({\n" +
                        "                    matchCollection: [\n" +
                        "                        ...this.state.matchCollection,\n" +
                        "                        {\n" +
                        "                            queueId: data.queueId,\n" +
                        "                            win: data.teams[team].win,\n" +
                        "                            champion: data.participants[participantId - 1][\"championId\"],\n" +
                        "                            championName: \"\",\n" +
                        "                            kills: data.participants[participantId - 1][\"stats\"][\"kills\"],\n" +
                        "                            deaths: data.participants[participantId - 1][\"stats\"][\"deaths\"],\n" +
                        "                            assists: data.participants[participantId - 1][\"stats\"][\"assists\"],\n" +
                        "                            level: data.participants[participantId - 1][\"stats\"][\"champLevel\"],\n" +
                        "                            cs: data.participants[participantId - 1][\"stats\"][\"totalMinionsKilled\"],\n" +
                        "                            multikill: data.participants[participantId - 1][\"stats\"][\"largestMultiKill\"],\n" +
                        "                            timestamp: data.gameCreation\n" +
                        "                        }\n" +
                        "                    ]\n" +
                        "                });\n" +
                        "            });\n" +
                        "    }\n" +
                        "\n" +
                        "    getMatches() {\n" +
                        "        this.setState({ matchCollection: [] }, () => {\n" +
                        "            for (let index = 0; index < this.state.numMatches; index++) {\n" +
                        "                this.getMatch(this.state.matches[index].gameId);\n" +
                        "            }\n" +
                        "        });\n" +
                        "    }\n" +
                        "\n" +
                        "    async getChampName(champNum) {\n" +
                        "        //this function will\n" +
                        "        await fetch(host + \":\" + port + \"/api/champName/\" + champNum)\n" +
                        "            .then(res => res.json())\n" +
                        "            .then(data => {\n" +
                        "                return data.champions;\n" +
                        "            });\n" +
                        "    }\n" +
                        "\n" +
                        "    render() {\n" +
                        "        let that = this;\n" +
                        "        return (\n" +
                        "            <div className=\"MatchHistory\">\n" +
                        "                {!this.state.showMatches ? <img src={logo} className=\"MatchHistory-logo\" alt=\"logo\" /> : \"\"}\n" +
                        "                <h1>{this.state.title}</h1>\n" +
                        "                <input\n" +
                        "                    className=\"MatchHistory-input\"\n" +
                        "                    type=\"text\"\n" +
                        "                    id=\"text\"\n" +
                        "                    value={this.state.text}\n" +
                        "                    onChange={e => {\n" +
                        "                        let regex = new RegExp(\"^[0-9a-zA-Z _.]+$\");\n" +
                        "                        if (regex.test(e.key)) {\n" +
                        "                            //League of Legends Api\n" +
                        "                            //  This function uses lol dev api to figure out the last played champion played by the user\n" +
                        "                            //  The User will input thier IGN (in game name) which will then trigger an api search\n" +
                        "                            this.setState({\n" +
                        "                                text: e.target.value\n" +
                        "                            });\n" +
                        "                        } else {\n" +
                        "                            console.log(\"bad\");\n" +
                        "                        }\n" +
                        "                    }}\n" +
                        "                    onKeyDown={e => {\n" +
                        "                        if (e.key === \"Enter\") {\n" +
                        "                            this.setState(\n" +
                        "                                {\n" +
                        "                                    summonerName: this.state.text,\n" +
                        "                                    matchCollection: [],\n" +
                        "                                    matches: []\n" +
                        "                                },\n" +
                        "                                () => this.getAccountId()\n" +
                        "                            );\n" +
                        "                            if (!this.state.showMatches) this.setState({ showMatches: 1 });\n" +
                        "                        }\n" +
                        "                    }}\n" +
                        "                />\n" +
                        "                <span className=\"MatchHistory-matches-above-span\" />\n" +
                        "                {!this.state.showMatches ? (\n" +
                        "                    <div className=\"MatchHistory-details\">\n" +
                        "                        <p>{this.state.accountId ? this.state.accountId : \"No Account ID\"}</p>\n" +
                        "                        <p>{this.state.summonerName ? this.state.summonerName : \"No Summoner Name\"}</p>\n" +
                        "                        <p>{this.state.matches[0] ? this.state.matches[0].champion : \"No Matches\"}</p>\n" +
                        "                    </div>\n" +
                        "                ) : (\n" +
                        "                    <div className=\"MatchHistory-matches\">\n" +
                        "                        {/* display matches */}\n" +
                        "                        {this.state.matchCollection.length >= this.state.numMatches ? \"\" : <Loading />}\n" +
                        "                        {Object.keys(this.state.matchCollection)\n" +
                        "                            .sort(function(a, b) {\n" +
                        "                                return that.state.matchCollection[b].timestamp - that.state.matchCollection[a].timestamp;\n" +
                        "                            })\n" +
                        "                            .map(item => {\n" +
                        "                                return (\n" +
                        "                                    <Suspense fallback={<div>Loading...</div>}>\n" +
                        "                                        <MatchView\n" +
                        "                                            win={that.state.matchCollection[item].win}\n" +
                        "                                            champion={that.state.matchCollection[item].champion}\n" +
                        "                                            kills={that.state.matchCollection[item].kills}\n" +
                        "                                            deaths={that.state.matchCollection[item].deaths}\n" +
                        "                                            assists={that.state.matchCollection[item].assists}\n" +
                        "                                            level={that.state.matchCollection[item].level}\n" +
                        "                                            cs={that.state.matchCollection[item].cs}\n" +
                        "                                            championIcon=\"Temp\"\n" +
                        "                                            multikill={that.state.matchCollection[item].multikill}\n" +
                        "                                            timestamp={that.state.matchCollection[item].timestamp}\n" +
                        "                                        />\n" +
                        "                                    </Suspense>\n" +
                        "                                );\n" +
                        "                            })}\n" +
                        "                    </div>\n" +
                        "                )}\n" +
                        "            </div>\n" +
                        "        );\n" +
                        "    }\n" +
                        "}\n" +
                        "\n" +
                        "export default MatchHistory;\n"} /> : ""}
                        {this.state.page === "Page" ? <Page /> : ""}
                        {this.state.page === "Page" ? <CodeView code={"./pages/Page.js"} /> : ""}
                    </Suspense>
                </header>
            </div>
        );
    }
}

export default App;
