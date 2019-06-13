import React from "react";
import logo from "../logo.svg";
import "./Page.css";

class Page extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="Page">
                <img src={logo} className="Page-logo" alt="logo" />
            </div>
        );
    }
}

export default Page;
