import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import SingleSurveys from "./SingleSurveys";
import Nav from "./Nav";

const styles = {
    margin: {
        marginTop: "30px"
    }
};

class SendMail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayData: [],
            surveys: []
        };
    }

    componentDidMount() {
        if (this.props.user.email === "") {
            this.props.history.push("/login");
        } else {
            this.fetchSurveys();
        }
    }

    handleMailSend = id => {
        axios
            .get(`http://localhost:4000/survey/send?id=${id}`)
            .then(res => res.data)
            .then(data => {
                if (data.message === "Send Successfully") {
                    this.props.history.push("/dashboard");
                }
            });
    };

    fetchSurveys = () => {
        axios
            .get(
                `http://localhost:4000/survey/view?user_id=${
                    this.props.user.id
                }`
            )
            .then(res => res.data)
            .then(data => {
                if (data.length > 0) {
                    this.setState(
                        {
                            surveys: data
                        },
                        () => {
                            const display = [...this.state.displayData];
                            this.state.surveys.map(survey => {
                                display.push(
                                    <div
                                        key={survey.id}
                                        className="col-md-4 col-xs-6"
                                    >
                                        <SingleSurveys
                                            handleSurveyClick={
                                                this.handleMailSend
                                            }
                                            survey={survey}
                                            btnText="Send Mail"
                                        />
                                    </div>
                                );
                                return true;
                            });
                            this.setState({ displayData: display });
                        }
                    );
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Nav user={this.props.user} />
                <div className={classes.margin}>
                    <div className="container">
                        <div className="row">{this.state.displayData}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SendMail);
