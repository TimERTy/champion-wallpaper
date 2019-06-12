import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../logo.svg';
import '../App.css';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            text: 'Summoner Name',
            summonerName: 'TimERTy',
            accountId: '',
        };
        this.getChampion = this.getChampion.bind(this);
    }

    getAccountId() {
        //Gets the api based off of the summoner name provided
        fetch('/api/summonerName/' + this.state.summonerName)
            .then(res => {
                return res.json();
            })
            .then(data => this.setState({accountId: data.accountId}));
    }

    getMatchHistory() {
        //this function will
        fetch('/api/summonerName/' + this.state.summonerName)
            .then(res => res.json())
            .then(data => this.setState({accountId: data.accountId}));
    }

    getChampion() {
        //League of Legends Api
        //  This function uses lol dev api to figure out the last played champion played by the user
        //  The User will input thier IGN (in game name) which will then trigger an api search
        this.getAccountId();
        this.getMatchHistory();
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
                        value={this.state.summonerName}
                        onChange={e => {
                            let regex = new RegExp('^[0-9a-zA-Z _.]+$');
                            if (regex.test(e.key)) {
                                this.setState({summonerName: e.target.value});
                            } else {
                                console.log('bad');
                            }
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                console.log('submit something?');
                                this.getChampion();
                            }
                        }}
                    />
                    <p>{this.state.accountId ? this.state.accountId : 'sadness'}</p>
                    <p>{this.state.summonerName ? this.state.summonerName : 'sadness'}</p>
                </header>
            </div>
        );
    }
}

export default Home;
