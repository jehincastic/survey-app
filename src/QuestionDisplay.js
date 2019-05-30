import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import Radio from "@material-ui/core/Radio";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

let temp1Disp = "";
let temp2Disp = null;
let temp3Disp = null;

const styles = () => ({
    wrap: {
        width: "100%"
    },
    sep: {
        display: "flex",
        flexWrap: "wrap",
        marginBottom: "50px"
    },
    title: {
        color: "#3f51b5"
    },
    root: {
        width: "80%",
        margin: "30px auto",
        marginLeft: 0,
        overflowX: "auto"
    },
    btn: {
        width: "80px",
        position: "absolute !important",
        left: "64px"
    },
    label: {
        textAlign: "left",
        width: "100%",
        fontSize: 20,
        marginBottom: "7px !important"
    },
    container: {
        marginLeft: "70px",
        marginTop: "80px",
        width: "100vw"
    },
    textField: {
        width: "45vw",
        marginTop: "-5px !important"
    },
    table: {
        minWidth: 700
    },
    questionHead: {
        fontSize: "28px",
        fontWeight: 400,
        textAlign: "left",
        marginLeft: "0"
    }
});

let id = 0;
function createData(name) {
    id += 1;
    return { id, name };
}

let idd = 0;
function createData3(name) {
    idd += 1;
    id = idd;
    return { id, name };
}

class QuestionDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: [],
            answersTemp1: [],
            questionsTemp1: [],
            answersTemp2: [],
            questionsTemp2: [],
            answersTemp3: [],
            questionsTemp3: [],
            display: null,
            checked: [],
            checked3: [],
            coltitle: []
        };
    }

    componentDidMount() {
        axios
            .get(
                `https://review-app-29389812321.herokuapp.com/survey/${
                    this.props.match.params.recid
                }/${this.props.match.params.surid}`
            )
            .then(res => res.data)
            .then(data => {
                if (data.message === "Response Submitted") {
                    this.props.history.push("/success");
                } else if (data.message === "404 Not Found") {
                    this.props.history.push("/404");                
                } else {
                    this.setState({ survey: data }, () => {
                        const rows1 = [...this.state.questionsTemp1];
                        const ans1 = [...this.state.answersTemp1];
                        const rows2 = [...this.state.questionsTemp2];
                        const rows3 = [...this.state.questionsTemp3];
                        data.questions.temp2Ques.map(q => {
                            rows2.push(createData(q));
                            this.setState({ questionsTemp2: rows2 }, () => {
                                const check = [];
                                this.state.questionsTemp2.map(q => {
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
                        const title = data.coltitle
                            .split(",")
                            .map(e => e.trim());
                        this.setState({ coltitle: title });
                        data.questions.temp3Ques.map(q => {
                            rows3.push(createData3(q));
                            this.setState({ questionsTemp3: rows3 }, () => {
                                const check = [];
                                this.state.questionsTemp3.map(q => {
                                    const a = [false, false, false, false];
                                    check.push(a);
                                    return 5;
                                });
                                this.setState({ checked3: check });
                            });
                            return true;
                        });
                        data.questions.temp1Ques.map(q => {
                            ans1.push("");
                            rows1.push(createData(q));
                            return true;
                        });
                        this.setState({
                            questionsTemp1: rows1,
                            answersTemp1: ans1
                        });
                    });
                }
            });
    }

    handleChangeRadio = e => {
        const answers = [...this.state.answersTemp2];
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
            answersTemp2: answers,
            checked: checked
        });
    };

    handleChange = e => {
        const ans = [...this.state.answersTemp1];
        const i = Number(e.target.name);
        ans[i] = e.target.value;
        this.setState({ answersTemp1: ans });
    };

    handleChange2 = e => {
        const answers = [...this.state.answersTemp3];
        const address = e.target.name.toString().split("");
        answers[Number(address[0]) - 1] = e.target.value;
        const checked = [...this.state.checked3];
        checked[Number(address[0]) - 1] = this.state.checked3[
            Number(address[0]) - 1
        ].map(c => {
            if (c) {
                c = false;
            }
            return c;
        });
        checked[Number(address[0]) - 1][Number(address[1]) - 1] = true;
        this.setState({
            answersTemp3: answers,
            checked3: checked
        });
    };

    setDisplay = () => {
        const ques = [...this.state.questionsTemp2];
        temp2Disp = ques.map((q, i) => {
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
                                            onChange={this.handleChangeRadio}
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
                                            onChange={this.handleChangeRadio}
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
                                            onChange={this.handleChangeRadio}
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
                                            onChange={this.handleChangeRadio}
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
                                            onChange={this.handleChangeRadio}
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

    displayTemp1 = () => {
        const ques = [...this.state.questionsTemp1];
        temp1Disp = ques.map(q => {
            const index = q.id - 1;
            return (
                <div className={this.props.classes.sep} key={q.id}>
                    <label
                        className={this.props.classes.label}
                        htmlFor={q.id.toString()}
                    >
                        {q.name}
                    </label>
                    <TextField
                        id={q.id.toString()}
                        name={index.toString()}
                        label="Your Answer"
                        multiline
                        rowsMax="4"
                        value={this.state.answersTemp1[index]}
                        onChange={this.handleChange}
                        className={this.props.classes.textField}
                        margin="normal"
                        required
                    />
                </div>
            );
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const q1 = this.state.questionsTemp1;
        const q2 = this.state.questionsTemp2;
        const q3 = this.state.questionsTemp3;
        let a1 = this.state.answersTemp1;
        const a2 = this.state.answersTemp2;
        a1 = a1.filter(a => a !== "");
        const a3 = this.state.answersTemp3;
        if (
            q1.length !== a1.length ||
            q2.length !== a2.length ||
            q3.length !== a3.length
        ) {
            console.log(q1);
            console.log(a1);
            console.log(a2);
            console.log(q1.length === a1.length);
            console.log(q2.length === a2.length);
            console.log(q3.length === a3.length);
        } else {
            axios
                .post(
                    `https://review-app-29389812321.herokuapp.com/survey/${
                        this.props.match.params.recid
                    }/${this.props.match.params.surid}`,
                    {
                        a1,
                        a2,
                        a3
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

    displayTemp3 = () => {
        const display = this.state.questionsTemp3.map((q, i) => (
            <TableRow key={q.id}>
                <TableCell component="th" scope="row">
                    {q.name}
                </TableCell>
                {this.state.coltitle.map((t, j) => {
                    return (
                        <TableCell key={j * 100} align="center">
                            <Radio
                                checked={
                                    this.state.checked3[i]
                                        ? this.state.checked3[i][j]
                                        : false
                                }
                                onChange={this.handleChange2}
                                value={this.state.coltitle[j]}
                                name={`${q.id}${j + 1}`}
                                aria-label="A"
                            />
                        </TableCell>
                    );
                })}
            </TableRow>
        ));
        const row = this.state.coltitle.map((t, a) => {
            return (
                <TableCell key={a} align="center">
                    {t}
                </TableCell>
            );
        });
        temp3Disp = (
            <Paper className={this.props.classes.root}>
                <Table className={this.props.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Questions</TableCell>
                            {row}
                        </TableRow>
                    </TableHead>
                    <TableBody>{display}</TableBody>
                </Table>
            </Paper>
        );
    };

    render() {
        this.displayTemp1();
        this.setDisplay();
        this.displayTemp3();
        const { title } = this.state.survey;
        const { classes } = this.props;
        return (
            <div className={classes.wrap}>
                <h1 className={classes.title}>{`Survey on ${title}`}</h1>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                >
                    {temp1Disp}
                    {temp2Disp}
                    {temp3Disp}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                    >
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default withStyles(styles)(QuestionDisplay);
