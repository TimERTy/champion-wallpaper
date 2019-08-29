import React from "react";
import "./CodeView.css";

export default class CodeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            code: this.props.code
        };
    }

    render() {
        return (
            <div className="CodeView">
                <textarea readOnly={"readonly"}>
                    {this.state.code}
                </textarea>
            </div>
        );
    }
}