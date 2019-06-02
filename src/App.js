import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input 
            className="App-input"
            type="text"
            value="TimERTy"
            onChange={getChampion()}
        />
      </header>
    </div>
  );
}

export default App;

class Input extends React.Component {
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      getAccountId (this.value);
    }
  }
  render() {
    return <input type="text" onKeyDown={this._handleKeyDown} />
  }
}

function fetchJson(url) {
    fetch(url)
    .then(response => response.json())
    .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData);
        return jsonData;
    })
    .catch((error) => {
        console.error(error);
    });
    return false;
}

function getAccountId(summonerName) {
    //Gets the api based off of the summoner name provided
    let url = "https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonerName+"?api_key=RGAPI-4691fa9f-f6fd-4a58-9d55-69050f28aaad";
    var promise = new Promise(fetchJson(url))
    .then((data) => {
        return data.accountId;
    });
}

function getChampion() {
    //League of Legends Api
    //  This function uses lol dev api to figure out the last played champion played by the user
    //  The User will input thier IGN (in game name) which will then trigger an api search
    let api_key = "RGAPI-4691fa9f-f6fd-4a58-9d55-69050f28aaad";
    let summonerName = "TimERTy";
    getAccountId(summonerName);
}

