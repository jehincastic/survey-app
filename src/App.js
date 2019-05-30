import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import jwt from "jsonwebtoken";
import Dashboard from "./Dashboard";
import AddSurvey from "./AddSurvey";
import ViewSurveys from "./ViewSurveys";
import ViewSingleSurvey from "./ViewSingleSurvey";
import QuestionDisplay from "./QuestionDisplay";
import SendMail from "./SendMail";
import Logout from "./Logout";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Temp1QuesDisplay from "./Temp1QuesDisplay";
import Temp3QuesDisplay from "./Temp3QuesDisplay";
import Temp2QuesDisplay from "./Temp2QuesDisplay";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            id: "",
            name: "",
            email: ""
        };
    }

    componentDidMount() {
        this.loginStateChange();
    }

    loginStateChange = () => {
        if (localStorage.hasOwnProperty("token")) {
            const token = localStorage.getItem("token");
            const decoded = jwt.verify(token, "privateKey");
            this.setState(
                {
                    loggedIn: true,
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email
                },
                () => {
                    if (
                        this.props.match.path === "/login" ||
                        this.props.match.path === "/register" ||
                        this.props.match.path === "/"
                    ) {
                        this.props.history.push("/dashboard");
                    } else {
                        this.props.history.push(this.props.match.path);
                    }
                }
            );
        }
    };

    handleLogOut = () => {
        localStorage.removeItem("token");
        this.setState(
            {
                loggedIn: false,
                id: "",
                name: "",
                email: ""
            },
            () => {
                this.props.history.push("/");
            }
        );
    };

    render() {
        const user = { ...this.state };
        return (
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={defaultProps => (
                            <Home
                                user={user}
                                {...defaultProps}
                                loginFunc={this.loginStateChange}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={defaultProps => (
                            <Login
                                user={user}
                                loginFunc={this.loginStateChange}
                                {...defaultProps}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/register"
                        render={defaultProps => (
                            <Register
                                user={user}
                                registerFunc={this.loginStateChange}
                                {...defaultProps}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/dashboard"
                        render={defaultProps => (
                            <Dashboard user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/add"
                        render={defaultProps => (
                            <AddSurvey user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/template1"
                        render={defaultProps => (
                            <Template1 user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/template2"
                        render={defaultProps => (
                            <Template2 user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/template3"
                        render={defaultProps => (
                            <Template3 user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/view"
                        render={defaultProps => (
                            <ViewSurveys user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/view/:id"
                        render={defaultProps => (
                            <ViewSingleSurvey user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/send"
                        render={defaultProps => (
                            <SendMail user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/survey/:recid/:surid"
                        render={defaultProps => (
                            <QuestionDisplay user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/questions-temp1/:recid/:surid"
                        render={defaultProps => (
                            <Temp1QuesDisplay user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/questions-temp2/:recid/:surid"
                        render={defaultProps => (
                            <Temp2QuesDisplay user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/questions-temp3/:recid/:surid"
                        render={defaultProps => (
                            <Temp3QuesDisplay user={user} {...defaultProps} />
                        )}
                    />
                    <Route
                        exact
                        path="/submitted"
                        render={defaultProps => (
                            <h1 style={{ color: "#3f51b5" }}>
                                You Have Already Submitted The Survey
                            </h1>
                        )}
                    />
                    <Route
                        exact
                        path="/success"
                        render={defaultProps => (
                            <h1 style={{ color: "#3f51b5" }}>
                                You Have Successfully Submitted The Survey
                            </h1>
                        )}
                    />
                    <Route
                        exact
                        path="/failed"
                        render={defaultProps => (
                            <h1 style={{ color: "#3f51b5" }}>
                                You Submission Has Failed Please Try Again.
                            </h1>
                        )}
                    />
                    <Route
                        exact
                        path="/logout"
                        render={defaultProps => (
                            <Logout handleLogOut={this.handleLogOut} />
                        )}
                    />
                    <Route render={() => <h1>404</h1>} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
