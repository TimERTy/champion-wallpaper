import React from "react";
import "./Page.css";

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hashKey: "Password" };
    }

    async* hasher() {
        while (true) {
            const msgBuffer = new TextEncoder('utf-8').encode(this.state.hashKey);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(element => ('00' + element.toString(16)).slice(-2)).join('');
            this.setState({ hashKey: hashHex });
            yield this.state.hashKey;
        }
    }

    render() {
        return (
            <div className="Page">
                <h3>{this.state.hashKey}</h3>
                <button onClick={() => { this.hasher().next().then(hash =>{this.setState({ hashKey: hash.value })}) }}>HashMe!</button>
            </div>
        );
    }
}