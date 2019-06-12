import React, {Component} from 'react';

class LeagueApiApp extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            summonerName: 'TimERTy',
            accountId: '',
        };
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getAccountId();
    }

    // Retrieves the list of items from the Express app
    getAccountId = () => {
        fetch('/api/summonerName/' + this.state.summonerName)
            .then(res => {
                return res.json();
            })
            .then(data => this.setState({accountId: data.accountId}));
    };

    render() {
        return (
            <div className="App">
                <h1>Account Id of {this.state.summonerName}</h1>
                <div>{this.state.accountId}</div>
            </div>
        );
    }
}

export default LeagueApiApp;
