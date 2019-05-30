import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
    root: {
        width: "80%",
        margin: "30px auto",
        maxHeight: "35vh",
        overflow: "scroll"
    },
    table: {
        minWidth: 700
    }
};

let id = 0;
const createQuestionData = name => {
    id += 1;
    return { id, name };
};

let j = 0;
const createResponseData = (email, responded, answers) => {
    j += 1;
    return { j, email, responded, answers };
};

class ViewSingleSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: "",
            qRows: [],
            rRows: [],
            noOfQuestions: [],
            answeredList: []
        };
    }

    componentDidMount() {
        axios
            .get(
                `https://review-app-29389812321.herokuapp.com/survey/view/${
                    this.props.match.params.id
                }`
            )
            .then(res => res.data)
            .then(data => {
                if (data.message === "Failed To Find") {
                    this.props.history.push("/dashboard");
                } else {
                    this.setState(
                        {
                            survey: data[0]
                        },
                        () => {
                            const a = [...this.state.qRows];
                            this.state.survey.questions.map(q => {
                                a.push(createQuestionData(q));
                                return true;
                            });
                            this.setState({ qRows: a }, () => {
                                const ansDisplay = [...this.state.answeredList];
                                this.state.survey.recipients.map(reci => {
                                    const ans = [...reci.answers];
                                    if (ans.length === 0) {
                                        this.state.survey.questions.map(q => {
                                            ans.push("--------");
                                            return true;
                                        });
                                    }
                                    const ab = [];
                                    ans.map((a, i) => {
                                        ab.push(
                                            <TableCell key={i} align="left">
                                                {a}
                                            </TableCell>
                                        );
                                        return true;
                                    });
                                    ansDisplay.push(ab);
                                    return true;
                                });
                                const ques = [...this.state.noOfQuestions];
                                this.state.survey.questions.map((q, i) => {
                                    ques.push(
                                        <TableCell key={i} align="left">
                                            {`Question ${i + 1}`}
                                        </TableCell>
                                    );
                                    return true;
                                });
                                const rows = [...this.state.rRows];
                                this.state.survey.recipients.map(r => {
                                    rows.push(
                                        createResponseData(
                                            r.email,
                                            r.responded,
                                            r.answers
                                        )
                                    );
                                    return true;
                                });
                                this.setState({
                                    noOfQuestions: ques,
                                    rRows: rows,
                                    answeredList: ansDisplay
                                });
                            });
                            return true;
                        }
                    );
                }
            });
    }

    render() {
        const { classes } = this.props;
        const { qRows, rRows } = this.state;
        return (
            <div>
                <Nav user={this.props.user} />
                <div className="Qtable">
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Number</TableCell>
                                    <TableCell align="left">
                                        Question Name
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {qRows.map((row, i) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {i + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                <div className="rTab">
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell align="left">
                                        Responded
                                    </TableCell>
                                    {this.state.noOfQuestions}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rRows.map((row, i) => (
                                    <TableRow key={row.id * 1000}>
                                        <TableCell component="th" scope="row">
                                            {row.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {Number(row.responded) ? "Yes" : "No"}
                                        </TableCell>
                                        {this.state.answeredList[i]}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ViewSingleSurvey);
