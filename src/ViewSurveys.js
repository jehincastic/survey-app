import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import Nav from "./Nav";
import SingleSurveys from "./SingleSurveys";

const styles = {
    heading: {
        color: "#3f51b5"
    }
};

class ViewSurveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            displayData: []
        };
    }

    handleSurveyClick = id => {
        this.props.history.push(`/view/${id}`);
    };

    componentDidMount() {
        if (this.props.user.email === "") {
            this.props.history.push("/login");
        } else {
            this.fetchSurveys();
        }
    }

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
                                                this.handleSurveyClick
                                            }
                                            survey={survey}
                                            btnText="View Survey"
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
                <h1 className={classes.heading}>View Surveys</h1>
                <div className="container">
                    <div className="row">{this.state.displayData}</div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ViewSurveys);
