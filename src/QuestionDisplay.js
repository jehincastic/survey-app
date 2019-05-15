import React, { Component } from "react";
import axios from "axios";

class QuestionDisplay extends Component {
    componentDidMount() {
        axios
            .get(
                `http://localhost:4000/survey/${
                    this.props.match.params.recid
                }/${this.props.match.params.surid}`
            )
            .then(res => res.data)
            .then(data => {
                if (!data.message) {
                    if(data.template === 1) {
                        const link = "/questions-temp1/" + this.props.match.params.recid + "/" + this.props.match.params.surid;
                        this.props.history.push(link);
                    }
                    else if (data.template === 2) {
                        const link = "/questions-temp2/" + this.props.match.params.recid + "/" + this.props.match.params.surid;
                        this.props.history.push(link);
                    } else if (data.template === 3) {
                        const link = "/questions-temp3/" + this.props.match.params.recid + "/" + this.props.match.params.surid;
                        this.props.history.push(link);
                    }
                } else if (data.message === "404 Not Found") {
                    this.props.history.push("/420");
                } else if (data.message === "Response Submitted") {
                    this.props.history.push("/submitted");
                }
            });
    }
    render() {
        return <h1>Loading...</h1>;
    }
}

export default QuestionDisplay;
