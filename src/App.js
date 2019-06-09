import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(){
        super()
        this.state={
            text: "Summoner Name",
            api_key: "RGAPI-a9e48566-c1f4-46ab-97ec-614a75b37691",
            summonerName: "TimERTy"
        }
        this.getChampion = this.getChampion.bind(this);
    }

    fetchJson(url) {
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
    
    getAccountId(summonerName) {
        //Gets the api based off of the summoner name provided
        let url = "https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + this.summonerName + "?api_key=" + this.api_key;
        console.log (this.fetchJson (url));
        //
    }
    
    getChampion() {
        //League of Legends Api
        //  This function uses lol dev api to figure out the last played champion played by the user
        //  The User will input thier IGN (in game name) which will then trigger an api search
        this.getAccountId(this.state.text);
    }

    render() {
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
            id="text"
            value={this.state.text}
            onChange={(e) => {
              let regex = new RegExp ("^[0-9a-zA-Z _.]+$");
              if (regex.test(e.key)) {
                  this.setState({text:e.target.value});
              } else {
                  console.log("bad");
              }
            }}
            onKeyDown={(e)=>{
              if(e.key == "Enter"){
                console.log("submit something?");
                this.getChampion();
              }
            }}
        />
          </header>
        </div>
      );
    }
}

export default App;
