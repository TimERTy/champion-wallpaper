import React from "react";
import "./MatchView.css";

class MatchView extends React.Component {
    //TODO: add summoners, items, masteries
    //TODO: add other players in match
    constructor(props) {
        super(props);
        this.state = {
            champName: ""
        };
        fetch("/api/champName/" + props.champion)
            .then(res => res.json())
            .then(data => {
                this.setState({ champName: data.champName });
            });
    }

    render() {
        return (
            <div className="MatchView" win={this.props.win}>
                <div className="MatchView-champion">{this.state.champName}</div>
                <div className="MatchView-KDA">
                    <div className="MatchView-KDA-kills">K: {this.props.kills}</div>
                    <div className="MatchView-KDA-deaths">D: {this.props.deaths}</div>
                    <div className="MatchView-KDA-assists">A: {this.props.assists}</div>
                </div>
                <div className="MatchView-stats">
                    <div className="MatchView-stats-level">Level: {this.props.level}</div>
                    <div className="MatchView-stats-cs">CS: {this.props.cs}</div>
                </div>
                <div className="MatchView-championIcon">{this.props.championIcon}</div>
            </div>
        );
    }
}

export default MatchView;
