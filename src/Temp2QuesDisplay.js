import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import Radio from "@material-ui/core/Radio";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

let display = null;

const styles = {
    title: {
        color: "#3f51b5"
    },
    root: {
        width: "80%",
        margin: "30px auto",
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    },
    btn: {
        width: "80px"
    },
    questionHead: {
        fontSize: "28px",
        fontWeight: 400,
        textAlign: "left",
        marginLeft: "10%"
    }
};

let id = 0;
function createData(name) {
    id += 1;
    return { id, name };
}

class Temp2QuesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: [],
            answers: [],
            checked: [],
            questions: []
        };
    }

    handleSubmit = () => {
        const { answers, questions } = this.state;
        if (answers.length !== questions.length) {
            alert("Please Submit All Answers");
        } else {
            axios
                .post(
                    `http://localhost:4000/survey/${
                        this.props.match.params.recid
                    }/${this.props.match.params.surid}`,
                    {
                        answers: this.state.answers
                    }
                )
                .then(res => res.data)
                .then(data => {
                    if (data.message === "Updated") {
                        this.props.history.push("/success");
                    } else {
                        this.props.history.push("/failed");
                    }
                });
        }
    };

    handleChange = e => {
        const answers = [...this.state.answers];
        const address = e.target.name.toString().split("");
        answers[Number(address[0])] = e.target.value;
        const checked = [...this.state.checked];
        checked[Number(address[0])] = this.state.checked[
            Number(address[0])
        ].map(c => {
            if (c) {
                c = false;
            }
            return c;
        });
        checked[Number(address[0])][Number(address[1])] = true;
        this.setState({
            answers: answers,
            checked: checked
        });
    };

    componentDidMount() {
        axios
            .get(
                `http://localhost:4000/survey/${
                    this.props.match.params.recid
                }/${this.props.match.params.surid}`
            )
            .then(res => res.data)
            .then(data => {
                if (data.template !== 2) {
                    const link = this.props.match.url.replace(
                        "questions-temp2",
                        "questions-temp" + data.template
                    );
                    this.props.history.push(link);
                } else {
                    if (!data.message) {
                        this.setState({ survey: data }, () => {
                            const rows = [...this.state.questions];
                            data.questions.map(q => {
                                rows.push(createData(q));
                                this.setState({ questions: rows }, () => {
                                    const check = [];
                                    this.state.questions.map(q => {
                                        const a = [
                                            false,
                                            false,
                                            false,
                                            false,
                                            false
                                        ];
                                        check.push(a);
                                        return 5;
                                    });
                                    this.setState({ checked: check });
                                });
                                return true;
                            });
                        });
                    } else if (data.message === "404 Not Found") {
                        this.props.history.push("/420");
                    } else if (data.message === "Response Submitted") {
                        this.props.history.push("/submitted");
                    }
                }
            });
    }

    setDisplay = () => {
        const ques = [...this.state.questions];
        display = ques.map((q, i) => {
            return (
                <div key={q.id} className={this.props.classes.singleQuestion}>
                    <h3 className={this.props.classes.questionHead}>
                        {q.name}
                    </h3>
                    <Paper className={this.props.classes.root}>
                        <Table className={this.props.classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center">1</TableCell>
                                    <TableCell align="center">2</TableCell>
                                    <TableCell align="center">3</TableCell>
                                    <TableCell align="center">4</TableCell>
                                    <TableCell align="center">5</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {this.state.survey.minvalue.toUpperCase()}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Radio
                                            checked={
                                                this.state.checked[i]
                                                    ? this.state.checked[i][0]
                                                    : false
                                            }
                                            onChange={this.handleChange}
                                            value="1"
                                            name={`${i}0`}
                                            aria-label="A"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Radio
                                            checked={
                                                this.state.checked[i]
                                                    ? this.state.checked[i][1]
                                                    : false
                                            }
                                            onChange={this.handleChange}
                                            value="2"
                                            name={`${i}1`}
                                            aria-label="A"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Radio
                                            checked={
                                                this.state.checked[i]
                                                    ? this.state.checked[i][2]
                                                    : false
                                            }
                                            onChange={this.handleChange}
                                            value="3"
                                            name={`${i}2`}
                                            aria-label="A"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Radio
                                            checked={
                                                this.state.checked[i]
                                                    ? this.state.checked[i][3]
                                                    : false
                                            }
                                            onChange={this.handleChange}
                                            value="4"
                                            name={`${i}3`}
                                            aria-label="A"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Radio
                                            checked={
                                                this.state.checked[i]
                                                    ? this.state.checked[i][4]
                                                    : false
                                            }
                                            onChange={this.handleChange}
                                            value="5"
                                            name={`${i}4`}
                                            aria-label="A"
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {this.state.survey.maxvalue.toUpperCase()}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        });
    };

    render() {
        this.setDisplay();
        const { classes } = this.props;
        const { title } = this.state.survey;
        return (
            <div>
                <h1 className={classes.title}>{`Survey on ${title}`}</h1>
                {display}
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                    onClick={this.handleSubmit}
                >
                    Submit
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Temp2QuesDisplay);
